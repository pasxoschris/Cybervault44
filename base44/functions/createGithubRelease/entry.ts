import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const REPO = 'pasxoschris/Cybervault44';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('github');

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'Cybervault44-Release-Bot',
    };

    // 1. Get latest release to determine current version + date
    let latestTag = null;
    let latestDate = null;
    try {
      const latestRes = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers });
      if (latestRes.ok) {
        const latest = await latestRes.json();
        latestTag = latest.tag_name;
        latestDate = latest.created_at;
      }
    } catch { /* no releases yet */ }

    // 2. Get commits since last release (or latest 100 if first release)
    const commitsUrl = latestDate
      ? `https://api.github.com/repos/${REPO}/commits?since=${latestDate}&per_page=100`
      : `https://api.github.com/repos/${REPO}/commits?per_page=100`;
    const commitsRes = await fetch(commitsUrl, { headers });
    if (!commitsRes.ok) {
      const errText = await commitsRes.text();
      return Response.json({ error: `GitHub commits API error (${commitsRes.status}): ${errText.substring(0, 200)}` }, { status: 502 });
    }
    const commitsText = await commitsRes.text();
    let commits;
    try {
      commits = JSON.parse(commitsText);
    } catch {
      return Response.json({ error: 'GitHub commits API returned non-JSON response' }, { status: 502 });
    }

    if (!Array.isArray(commits) || commits.length === 0) {
      return Response.json({ status: 'no_changes', message: 'Δεν υπάρχουν νέα commits από το τελευταίο release.' });
    }

    // 3. Calculate new version (increment patch)
    let major = 1, minor = 0, patch = 0;
    if (latestTag) {
      const m = latestTag.match(/^v?(\d+)\.(\d+)\.(\d+)/);
      if (m) { major = parseInt(m[1]); minor = parseInt(m[2]); patch = parseInt(m[3]); }
    }
    patch += 1;
    const newTag = `v${major}.${minor}.${patch}`;

    // 4. Build changelog from commit messages
    const changelog = commits.map(c => {
      const msg = (c.commit?.message || '').split('\n')[0];
      const sha = (c.sha || '').substring(0, 7);
      return `- \`${sha}\` ${msg}`;
    }).join('\n');

    const body = `## Αλλαγές σε αυτή την έκδοση\n\n${changelog}\n\n---\nΣυνολικά ${commits.length} commit(s)`;

    // 5. Create the release (creates a git tag on latest commit of default branch)
    const createRes = await fetch(`https://api.github.com/repos/${REPO}/releases`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tag_name: newTag,
        name: newTag,
        body: body,
        generate_release_notes: false,
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      return Response.json({ error: `GitHub API error: ${err}` }, { status: 502 });
    }

    const release = await createRes.json();
    return Response.json({
      status: 'created',
      tag: newTag,
      commits: commits.length,
      release_url: release.html_url,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});