import { jsPDF } from 'jspdf';
import { MANUAL_META, MANUAL_CHAPTERS, MANUAL_CLOSING } from './serviceManual';

const FONT = 'Roboto';
const PW = 210; // A4 πλάτος (mm)
const PH = 297; // A4 ύψος (mm)
const ML = 18;
const MR = 18;
const MT = 20;
const MB = 22;
const CW = PW - ML - MR;
const BOTTOM = PH - MB;

const FONT_URLS = {
  normal: 'https://cdn.jsdelivr.net/npm/@expo-google-fonts/roboto/Roboto_400Regular.ttf',
  bold: 'https://cdn.jsdelivr.net/npm/@expo-google-fonts/roboto/Roboto_700Bold.ttf',
};

const GRADIENT = [[106, 43, 158], [179, 36, 131]];
const PURPLE = [106, 43, 158];
const INK = [45, 32, 85];
const BODY = [55, 65, 81];

const NOTE_STYLES = {
  info: { bg: [239, 246, 255], border: [191, 219, 254], accent: [59, 130, 246], title: [30, 64, 175] },
  warning: { bg: [255, 247, 237], border: [254, 215, 170], accent: [249, 115, 22], title: [154, 52, 18] },
  success: { bg: [240, 253, 244], border: [187, 247, 208], accent: [34, 197, 94], title: [21, 128, 61] },
  purple: { bg: [250, 245, 255], border: [233, 213, 255], accent: [147, 51, 234], title: [107, 33, 168] },
};

const SYMBOLS = {
  '✓': 'τικ',
  '✔': 'τικ',
  '✗': 'Χ',
  '▽': 'τρίγωνο',
  '☰': '',
  '→': '>',
  '←': '<',
  '↗': '>',
  '↑': '',
  '↓': '',
  '•': '•',
};

// Αφαιρεί σύμβολα/emoji που δεν υπάρχουν στη γραμματοσειρά του PDF
const sanitize = (text) => {
  let out = String(text || '');
  Object.entries(SYMBOLS).forEach(([from, to]) => { out = out.split(from).join(to); });
  out = out.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2190}-\u{21FF}\u{FE0F}]/gu, '');
  out = out.replace(/\*\*\s*\*\*/g, '');
  return out.replace(/[ \t]{2,}/g, ' ').trim();
};

const parseRich = (text) => {
  const parts = [];
  const re = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ t: text.slice(last, m.index), b: false });
    parts.push({ t: m[1], b: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ t: text.slice(last), b: false });
  return parts.length ? parts : [{ t: text, b: false }];
};

const setFont = (doc, isBold, size) => {
  doc.setFont(FONT, isBold ? 'bold' : 'normal');
  doc.setFontSize(size);
};

const lineH = (size) => size * 0.3528 * 1.45;

const wrapRich = (doc, text, maxWidth, size) => {
  const tokens = [];
  parseRich(text).forEach(({ t, b }) => {
    t.split(/\s+/).filter(Boolean).forEach((word) => tokens.push({ t: word, b }));
  });
  const widthOf = (word, b) => { setFont(doc, b, size); return doc.getTextWidth(word); };
  const lines = [];
  let current = [];
  let currentWidth = 0;
  tokens.forEach((token) => {
    const w = widthOf(token.t, token.b);
    if (!current.length) { current = [token]; currentWidth = w; return; }
    const space = widthOf(' ', token.b);
    if (currentWidth + space + w > maxWidth) {
      lines.push(current);
      current = [token];
      currentWidth = w;
    } else {
      currentWidth += space + w;
      current.push(token);
    }
  });
  if (current.length) lines.push(current);
  return lines;
};

const measureTokens = (doc, tokens, size) => {
  let width = 0;
  tokens.forEach((token, i) => {
    setFont(doc, token.b, size);
    width += doc.getTextWidth(token.t);
    if (i > 0) { setFont(doc, token.b, size); width += doc.getTextWidth(' '); }
  });
  return width;
};

const drawRich = (doc, tokens, x, baseline, size, color, align = 'left') => {
  const total = measureTokens(doc, tokens, size);
  let cx = align === 'center' ? x - total / 2 : x;
  doc.setTextColor(color[0], color[1], color[2]);
  tokens.forEach((token, i) => {
    setFont(doc, token.b, size);
    if (i > 0) cx += doc.getTextWidth(' ');
    doc.text(token.t, cx, baseline);
    cx += doc.getTextWidth(token.t);
  });
};

const fetchBase64 = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font load failed: ${res.status}`);
  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
};

const loadImageDataUrl = async (url) => {
  const res = await fetch(url, { mode: 'cors' });
  if (!res.ok) throw new Error(`Image load failed: ${res.status}`);
  const blob = await res.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Image read failed'));
    reader.readAsDataURL(blob);
  });
};

export async function generateServiceManualPdf({ onProgress } = {}) {
  const [fontNormal, fontBold] = await Promise.all([
    fetchBase64(FONT_URLS.normal),
    fetchBase64(FONT_URLS.bold),
  ]);

  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  doc.addFileToVFS('Roboto-Regular.ttf', fontNormal);
  doc.addFileToVFS('Roboto-Bold.ttf', fontBold);
  doc.addFont('Roboto-Regular.ttf', FONT, 'normal');
  doc.addFont('Roboto-Bold.ttf', FONT, 'bold');
  setFont(doc, false, 10.5);

  const y = { v: MT };
  const newPage = () => { doc.addPage(); y.v = MT; };
  const ensure = (h) => { if (y.v + h > BOTTOM) newPage(); };

  const paragraph = (text, { size = 10.5, indent = 0, color = BODY, gap = 3, spacing = 1.1 } = {}) => {
    const clean = sanitize(text);
    if (!clean) return;
    const lines = wrapRich(doc, clean, CW - indent, size);
    const lh = lineH(size) + spacing;
    lines.forEach((tokens) => {
      ensure(lh);
      drawRich(doc, tokens, ML + indent, y.v, size, color);
      y.v += lh;
    });
    y.v += gap;
  };

  const drawSection = (title) => {
    const clean = sanitize(title);
    const lines = wrapRich(doc, clean, CW - 6, 12.5);
    ensure(lines.length * lineH(12.5) + 6);
    y.v += 2;
    doc.setFillColor(147, 51, 234);
    doc.roundedRect(ML, y.v - 3.6, 1.6, 4.8, 0.8, 0.8, 'F');
    lines.forEach((tokens) => {
      drawRich(doc, tokens, ML + 5, y.v, 12.5, INK);
      y.v += lineH(12.5);
    });
    y.v += 3.5;
  };

  const counter = { value: 0 };

  const drawStep = (block) => {
    const index = typeof block.n === 'number' ? block.n : counter.value + 1;
    if (typeof block.n !== 'number') counter.value += 1;

    const r = 3.6;
    const indent = r * 2 + 4;
    const titleLines = wrapRich(doc, sanitize(block.title), CW - indent, 11.2);
    ensure(titleLines.length * lineH(11.2) + 8);

    const cy = y.v - 1.4;
    doc.setFillColor(91, 33, 182);
    doc.circle(ML + r, cy, r, 'F');
    setFont(doc, true, 8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(String(index), ML + r, cy + 1.1, { align: 'center' });

    titleLines.forEach((tokens) => {
      drawRich(doc, tokens, ML + indent, y.v, 11.2, INK);
      y.v += lineH(11.2);
    });
    y.v += 1.4;
    (block.lines || []).forEach((line) => paragraph(line, { size: 10.2, indent, gap: 1.6 }));
    y.v += 2.4;
  };

  const drawNote = (block) => {
    const style = NOTE_STYLES[block.variant] || NOTE_STYLES.info;
    const size = 10;
    const lh = lineH(size) + 0.9;
    const pad = 5;
    const textW = CW - pad * 2 - 3;

    const items = [];
    if (block.title) {
      wrapRich(doc, sanitize(block.title), textW, 10.5).forEach((tokens) => items.push({ h: lineH(10.5), tokens, isTitle: true }));
    }
    (block.lines || []).forEach((line, index) => {
      wrapRich(doc, sanitize(line), textW, size).forEach((tokens) => items.push({ h: lh, tokens }));
      if (index < block.lines.length - 1) items.push({ h: 1.4, gap: true });
    });
    if (block.smallLines?.length) {
      items.push({ h: 2.6, gap: true });
      block.smallLines.forEach((line) => {
        wrapRich(doc, sanitize(line), textW, 8.8).forEach((tokens) => {
          items.push({ h: lineH(8.8) + 0.8, tokens, small: true });
        });
      });
    }
    if (!items.length) return;

    let idx = 0;
    while (idx < items.length) {
      const available = BOTTOM - y.v;
      let total = pad * 2;
      let end = idx;
      while (end < items.length && total + items[end].h <= available) {
        total += items[end].h;
        end += 1;
      }
      if (end === idx) { newPage(); continue; }

      const top = y.v - 3;
      doc.setFillColor(style.bg[0], style.bg[1], style.bg[2]);
      doc.setDrawColor(style.border[0], style.border[1], style.border[2]);
      doc.setLineWidth(0.4);
      doc.roundedRect(ML, top, CW, total, 2.5, 2.5, 'FD');
      doc.setFillColor(style.accent[0], style.accent[1], style.accent[2]);
      doc.roundedRect(ML, top, 1.6, total, 0.8, 0.8, 'F');

      let baseline = top + pad + 2.4;
      for (let k = idx; k < end; k += 1) {
        const item = items[k];
        if (!item.gap) {
          const itemSize = item.small ? 8.8 : item.isTitle ? 10.5 : size;
          const itemColor = item.small ? [122, 114, 142] : item.isTitle ? style.title : BODY;
          drawRich(doc, item.tokens, ML + pad + 1.5, baseline, itemSize, itemColor);
        }
        baseline += item.h;
      }

      y.v = top + total + 4.5;
      idx = end;
      if (idx < items.length) newPage();
    }
  };

  const drawImage = async (block) => {
    let dataUrl;
    try {
      dataUrl = await loadImageDataUrl(block.src);
    } catch {
      return; // η εικόνα παραλείπεται, το κεφάλαιο συνεχίζει
    }
    const props = doc.getImageProperties(dataUrl);
    const ratio = props.height / props.width;
    const captionH = block.caption ? 6 : 0;

    let w = CW;
    let h = w * ratio;
    const maxH = 132;
    if (h > maxH) { h = maxH; w = h / ratio; }
    if (w > CW) { w = CW; h = w * ratio; }

    if (y.v + h + captionH > BOTTOM) {
      if (h + captionH <= BOTTOM - MT) {
        newPage();
      } else {
        const available = BOTTOM - y.v - captionH;
        if (available < 50) newPage();
        const limit = BOTTOM - y.v - captionH;
        h = Math.min(h, limit);
        w = h / ratio;
      }
    }

    const x = ML + (CW - w) / 2;
    doc.setFillColor(246, 247, 250);
    doc.roundedRect(x - 1.5, y.v - 1.5, w + 3, h + 3, 2, 2, 'F');
    doc.addImage(dataUrl, props.fileType || 'PNG', x, y.v, w, h);
    y.v += h + 3;

    if (block.caption) {
      setFont(doc, false, 8.5);
      doc.setTextColor(150, 152, 162);
      doc.text(sanitize(block.caption), ML + CW / 2, y.v, { align: 'center', maxWidth: CW });
      y.v += 5;
    }
    y.v += 3;
  };

  const drawCover = async (logoImages) => {
    const bands = 240;
    for (let i = 0; i < bands; i += 1) {
      const t = i / (bands - 1);
      const color = GRADIENT[0].map((v, k) => Math.round(v + (GRADIENT[1][k] - v) * t));
      doc.setFillColor(color[0], color[1], color[2]);
      doc.rect(0, (PH / bands) * i, PW, PH / bands + 0.3, 'F');
    }

    const boxW = 132;
    const boxH = 40;
    const boxX = (PW - boxW) / 2;
    const boxY = 60;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(boxX, boxY, boxW, boxH, 4, 4, 'F');

    const cellW = boxW / MANUAL_META.logos.length;
    logoImages.forEach((dataUrl, i) => {
      const logo = MANUAL_META.logos[i];
      // Κλικ στο λογότυπο -> άνοιγμα της αντίστοιχης ιστοσελίδας
      if (logo && logo.url) doc.link(boxX + cellW * i, boxY, cellW, boxH, { url: logo.url });
      if (!dataUrl) return;
      const props = doc.getImageProperties(dataUrl);
      const ratio = props.height / props.width;
      let h = 24;
      let w = h / ratio;
      if (w > cellW - 16) { w = cellW - 16; h = w * ratio; }
      doc.addImage(dataUrl, props.fileType || 'PNG', boxX + cellW * i + (cellW - w) / 2, boxY + (boxH - h) / 2, w, h);
    });
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(boxX + cellW, boxY + 9, boxX + cellW, boxY + boxH - 9);

    let titleY = 150;
    wrapRich(doc, MANUAL_META.title, CW - 10, 28).forEach((tokens) => {
      drawRich(doc, tokens, PW / 2, titleY, 28, [255, 255, 255], 'center');
      titleY += lineH(28);
    });

    drawRich(doc, parseRich(sanitize(MANUAL_META.subtitle)), PW / 2, titleY + 5, 15, [238, 232, 248], 'center');
    drawRich(doc, parseRich(sanitize(MANUAL_META.subtitleLong)), PW / 2, titleY + 14, 11, [216, 206, 236], 'center');

    // Διακριτική παραπομπή στο online υλικό — δεν αυξάνει το ύψος της σύνθεσης
    drawRich(doc, parseRich(sanitize(MANUAL_META.coverNote)), PW / 2, titleY + 23, 9.5, [208, 196, 230], 'center');

    setFont(doc, false, 10.5);
    doc.setTextColor(226, 218, 240);
    const dateLabel = new Date().toLocaleDateString('el-GR', { month: 'long', year: 'numeric' });
    doc.text(`Έκδοση: ${dateLabel}`, PW / 2, titleY + 30, { align: 'center' });

    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.4);
    doc.line(PW / 2 - 25, titleY + 38, PW / 2 + 25, titleY + 38);
  };

  const chapterStart = (number, chapter) => {
    doc.addPage();
    y.v = MT;
    counter.value = 0;

    const badge = 10;
    doc.setFillColor(PURPLE[0], PURPLE[1], PURPLE[2]);
    doc.roundedRect(ML, y.v - 6, badge, badge, 2.4, 2.4, 'F');
    setFont(doc, true, 12);
    doc.setTextColor(255, 255, 255);
    doc.text(String(number), ML + badge / 2, y.v + 0.6, { align: 'center' });

    // Ο τίτλος του κεφαλαίου πάντα έντονος (bold)
    wrapRich(doc, `**${sanitize(chapter.title)}**`, CW - badge - 5, 17).forEach((tokens) => {
      drawRich(doc, tokens, ML + badge + 5, y.v, 17, INK);
      y.v += lineH(17);
    });
    y.v += 4;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(ML, y.v, PW - MR, y.v);
    y.v += 8;

    if (chapter.subtitle) paragraph(chapter.subtitle, { size: 10.5, color: [122, 114, 142], gap: 6 });
  };

  // Καταληκτική σελίδα (χωρίς αρίθμηση κεφαλαίου, εκτός Περιεχομένων): online υλικό & assistant
  const drawClosing = () => {
    doc.addPage();
    y.v = MT;

    drawSection(MANUAL_CLOSING.title);
    (MANUAL_CLOSING.paragraphs || []).forEach((line) => paragraph(line, { size: 10.5, gap: 2.4 }));

    // Ενεργός σύνδεσμος προς τον online οδηγό (ίδια τεχνική με τα λογότυπα του εξωφύλλου)
    const linkSize = 12;
    const link = MANUAL_CLOSING.link;
    ensure(lineH(linkSize) + 4);
    const tokens = [{ t: link.label, b: true }];
    drawRich(doc, tokens, ML, y.v, linkSize, PURPLE);
    setFont(doc, true, linkSize);
    const linkW = doc.getTextWidth(link.label);
    doc.setDrawColor(PURPLE[0], PURPLE[1], PURPLE[2]);
    doc.setLineWidth(0.3);
    doc.line(ML, y.v + 1.4, ML + linkW, y.v + 1.4);
    doc.link(ML - 1, y.v - 4.5, linkW + 2, 7.5, { url: link.url });
    y.v += lineH(linkSize) + 5;

    (MANUAL_CLOSING.notes || []).forEach((block) => drawNote(block));
  };

  const drawToc = (entries) => {
    doc.setPage(2);
    y.v = MT;
    setFont(doc, true, 20);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.text('Περιεχόμενα', ML, y.v + 2);
    y.v += 12;
    doc.setFillColor(147, 51, 234);
    doc.roundedRect(ML, y.v - 5, 22, 1.2, 0.6, 0.6, 'F');
    y.v += 7;

    entries.forEach((entry, index) => {
      const label = sanitize(`${index + 1}. ${entry.title}`);
      const page = String(entry.page);
      setFont(doc, false, 10.5);
      doc.setTextColor(BODY[0], BODY[1], BODY[2]);
      doc.text(label, ML, y.v);
      const labelW = doc.getTextWidth(label);
      setFont(doc, true, 10.5);
      const pageW = doc.getTextWidth(page);
      const startX = ML + labelW + 2;
      const endX = PW - MR - pageW - 2;
      if (endX > startX) {
        doc.setDrawColor(205, 210, 220);
        doc.setLineWidth(0.25);
        doc.setLineDashPattern([0.5, 1.3], 0);
        doc.line(startX, y.v - 1, endX, y.v - 1);
        doc.setLineDashPattern([], 0);
      }
      doc.setTextColor(INK[0], INK[1], INK[2]);
      doc.text(page, PW - MR, y.v, { align: 'right' });
      // Κλικ στη γραμμή των περιεχομένων -> μετάβαση στο κεφάλαιο
      doc.link(ML, y.v - 4, CW, 6, { pageNumber: entry.page });
      y.v += 7.4;
    });
  };

  const drawFooters = () => {
    const total = doc.getNumberOfPages();
    for (let p = 2; p <= total; p += 1) {
      doc.setPage(p);
      doc.setDrawColor(230, 232, 238);
      doc.setLineWidth(0.3);
      doc.line(ML, PH - MB + 4, PW - MR, PH - MB + 4);
      setFont(doc, false, 8.5);
      doc.setTextColor(150, 152, 162);
      doc.text(sanitize(MANUAL_META.footer), ML, PH - MB + 8.5);
      doc.text(`${p} / ${total}`, PW - MR, PH - MB + 8.5, { align: 'right' });
    }
  };

  const logoImages = await Promise.all(MANUAL_META.logos.map((logo) => loadImageDataUrl(logo.src).catch(() => null)));
  await drawCover(logoImages);

  doc.addPage(); // σελίδα Περιεχομένων (συμπληρώνεται στο τέλος)

  const entries = [];
  for (let i = 0; i < MANUAL_CHAPTERS.length; i += 1) {
    onProgress?.(i, MANUAL_CHAPTERS.length);
    const chapter = MANUAL_CHAPTERS[i];
    chapterStart(i + 1, chapter);
    entries.push({ title: chapter.title, page: doc.getNumberOfPages() });

    for (const block of chapter.blocks) {
      if (block.type === 'section') drawSection(block.title);
      else if (block.type === 'step') drawStep(block);
      else if (block.type === 'note') drawNote(block);
      else if (block.type === 'image') await drawImage(block);
      else if (block.type === 'text') (block.lines || []).forEach((line) => paragraph(line));
    }
    onProgress?.(i + 1, MANUAL_CHAPTERS.length);
  }

  drawClosing();

  drawToc(entries);
  drawFooters();

  doc.save(MANUAL_META.fileName);
}