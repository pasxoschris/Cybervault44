import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { jsPDF } from 'jspdf';
import { MANUAL_META, MANUAL_CHAPTERS, MANUAL_INFO_CHAPTERS, MANUAL_CLOSING } from './serviceManual';
import { MANUAL_PROFILES } from './manualProfiles';
import { SHIFT_JOURNEY, journeyChapterRef } from '@/lib/shiftJourney';
import { STEP_ICONS } from '@/lib/shiftJourneyIcons';

const FONT = 'Roboto';

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

// Σπάει λέξεις που δεν χωρούν σε μία γραμμή (π.χ. μεγάλα URLs)
const splitLongWord = (doc, word, bold, maxWidth, size) => {
  setFont(doc, bold, size);
  const parts = [];
  let current = '';
  for (const ch of word) {
    if (current && doc.getTextWidth(current + ch) > maxWidth) {
      parts.push(current);
      current = ch;
    } else {
      current += ch;
    }
  }
  if (current) parts.push(current);
  return parts;
};

const wrapRich = (doc, text, maxWidth, size) => {
  const words = [];
  parseRich(text).forEach(({ t, b }) => {
    t.split(/\s+/).filter(Boolean).forEach((word) => words.push({ t: word, b }));
  });

  const tokens = [];
  words.forEach((word) => {
    setFont(doc, word.b, size);
    if (doc.getTextWidth(word.t) <= maxWidth) {
      tokens.push(word);
      return;
    }
    splitLongWord(doc, word.t, word.b, maxWidth, size).forEach((part) => tokens.push({ t: part, b: word.b }));
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

// Μέγεθος γραμματοσειράς ώστε μια διεύθυνση να χωρέσει σε μία γραμμή
const fitSizeForWidth = (doc, text, maxWidth, preferred, min) => {
  let size = preferred;
  doc.setFont(FONT, 'normal');
  doc.setFontSize(size);
  while (size > min && doc.getTextWidth(text) > maxWidth) {
    size -= 0.2;
    doc.setFontSize(size);
  }
  return size;
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

// Εικονίδιο βήματος (lucide) -> PNG data URL, για να σχεδιαστεί στη χρονογραμμή του PDF
const iconToPng = (IconComponent, size = 160) =>
  new Promise((resolve) => {
    const svg = renderToStaticMarkup(React.createElement(IconComponent, { size, color: '#FFFFFF', strokeWidth: 2 }));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      canvas.getContext('2d').drawImage(img, 0, 0, size, size);
      try { resolve(canvas.toDataURL('image/png')); } catch { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });

export async function generateServiceManualPdf({ onProgress, profile = 'print' } = {}) {
  const P = MANUAL_PROFILES[profile] || MANUAL_PROFILES.print;
  const S = P.sizes;
  const C = P.cover;

  const PW = P.pageW;
  const PH = P.pageH;
  const ML = P.margin.l;
  const MR = P.margin.r;
  const MT = P.margin.t;
  const MB = P.margin.b;
  const CW = PW - ML - MR;
  const BOTTOM = PH - MB;
  const lineH = (size) => size * 0.3528 * P.lineSpacing;

  const [fontNormal, fontBold] = await Promise.all([
    fetchBase64('https://cdn.jsdelivr.net/npm/@expo-google-fonts/roboto/Roboto_400Regular.ttf'),
    fetchBase64('https://cdn.jsdelivr.net/npm/@expo-google-fonts/roboto/Roboto_700Bold.ttf'),
  ]);

  const doc = new jsPDF({ unit: 'mm', format: [PW, PH], compress: true });
  doc.addFileToVFS('Roboto-Regular.ttf', fontNormal);
  doc.addFileToVFS('Roboto-Bold.ttf', fontBold);
  doc.addFont('Roboto-Regular.ttf', FONT, 'normal');
  doc.addFont('Roboto-Bold.ttf', FONT, 'bold');
  setFont(doc, false, S.body);

  const y = { v: MT };
  const newPage = () => { doc.addPage(); y.v = MT; };
  const ensure = (h) => { if (y.v + h > BOTTOM) newPage(); };

  const paragraph = (text, { size = S.body, indent = 0, color = BODY, gap = 3, spacing = 1.1 } = {}) => {
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
    const lines = wrapRich(doc, clean, CW - 6, S.sectionTitle);
    ensure(lines.length * lineH(S.sectionTitle) + 6);
    y.v += 2;
    doc.setFillColor(147, 51, 234);
    doc.roundedRect(ML, y.v - 3.6, 1.6, 4.8, 0.8, 0.8, 'F');
    lines.forEach((tokens) => {
      drawRich(doc, tokens, ML + 5, y.v, S.sectionTitle, INK);
      y.v += lineH(S.sectionTitle);
    });
    y.v += 3.5;
  };

  const counter = { value: 0 };

  const drawStep = (block) => {
    const index = typeof block.n === 'number' ? block.n : counter.value + 1;
    if (typeof block.n !== 'number') counter.value += 1;

    const r = P.stepCircleR;
    const indent = r * 2 + 4;
    const titleLines = wrapRich(doc, sanitize(block.title), CW - indent, S.stepTitle);
    ensure(titleLines.length * lineH(S.stepTitle) + 8);

    const cy = y.v - 1.4;
    doc.setFillColor(91, 33, 182);
    doc.circle(ML + r, cy, r, 'F');
    setFont(doc, true, S.stepNumber);
    doc.setTextColor(255, 255, 255);
    doc.text(String(index), ML + r, cy + S.stepNumber * 0.13, { align: 'center' });

    titleLines.forEach((tokens) => {
      drawRich(doc, tokens, ML + indent, y.v, S.stepTitle, INK);
      y.v += lineH(S.stepTitle);
    });
    y.v += 1.4;
    (block.lines || []).forEach((line) => paragraph(line, { size: S.stepBody, indent, gap: 1.6 }));
    y.v += 2.4;
  };

  const drawNote = (block) => {
    const style = NOTE_STYLES[block.variant] || NOTE_STYLES.info;
    const size = S.noteBody;
    const lh = lineH(size) + 0.9;
    const pad = P.notePad;
    const textW = CW - pad * 2 - 3;

    const items = [];
    if (block.title) {
      wrapRich(doc, sanitize(block.title), textW, S.noteTitle).forEach((tokens) => items.push({ h: lineH(S.noteTitle), tokens, isTitle: true }));
    }
    (block.lines || []).forEach((line, index) => {
      wrapRich(doc, sanitize(line), textW, size).forEach((tokens) => items.push({ h: lh, tokens }));
      if (index < block.lines.length - 1) items.push({ h: 1.4, gap: true });
    });
    if (block.smallLines?.length) {
      items.push({ h: 2.6, gap: true });
      block.smallLines.forEach((line) => {
        wrapRich(doc, sanitize(line), textW, S.noteSmall).forEach((tokens) => {
          items.push({ h: lineH(S.noteSmall) + 0.8, tokens, small: true });
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
          const itemSize = item.small ? S.noteSmall : item.isTitle ? S.noteTitle : size;
          const itemColor = item.small ? P.smallNoteColor : item.isTitle ? style.title : BODY;
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
    const maxH = P.imageMaxH;
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
      setFont(doc, false, S.caption);
      doc.setTextColor(150, 152, 162);
      doc.text(sanitize(block.caption), ML + CW / 2, y.v, { align: 'center', maxWidth: CW });
      y.v += 5;
    }
    y.v += 3;
  };

  // Σύνδεσμος με QR: η διεύθυνση μπαίνει σε μία μόνο γραμμή (ποτέ σπασμένη στα δύο)
  const drawLink = async (block) => {
    const L = P.link;

    if (block.title) paragraph(block.title, { size: L.titleSize, color: INK, gap: 2.5 });

    if (block.qr) {
      const qr = await qrDataUrl(block.url);
      if (qr) {
        const size = L.qrSize;
        const pad = L.qrPad;
        const box = size + pad * 2;
        ensure(box + 5);
        const x = ML + (CW - size) / 2;
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.4);
        doc.roundedRect(x - pad, y.v, box, box, 2, 2, 'FD');
        doc.addImage(qr, 'PNG', x, y.v + pad, size, size);
        doc.link(x - pad, y.v, box, box, { url: block.url });
        y.v += box + 4;
      }
    }

    // Η διεύθυνση πάντα σε μία γραμμή (μικραίνει αν χρειάζεται, δεν σπάει ποτέ)
    const size = fitSizeForWidth(doc, block.url, CW, L.urlSize, L.minUrlSize);
    setFont(doc, false, size);
    ensure(lineH(size) + 3);
    const urlW = doc.getTextWidth(block.url);
    const urlX = ML + Math.max(0, (CW - urlW) / 2);
    doc.setTextColor(PURPLE[0], PURPLE[1], PURPLE[2]);
    doc.text(block.url, urlX, y.v);
    doc.setDrawColor(PURPLE[0], PURPLE[1], PURPLE[2]);
    doc.setLineWidth(0.3);
    doc.line(urlX, y.v + 1.3, urlX + urlW, y.v + 1.3);
    doc.link(urlX - 1.5, y.v - 4.2, urlW + 3, 7, { url: block.url });
    y.v += lineH(size) + 2;

    if (block.caption) {
      wrapRich(doc, sanitize(block.caption), CW, L.caption).forEach((tokens) => {
        ensure(lineH(L.caption));
        drawRich(doc, tokens, ML + CW / 2, y.v, L.caption, P.smallNoteColor, 'center');
        y.v += lineH(L.caption);
      });
    }
    y.v += 3;
  };

  // QR code για σύνδεσμο, ώστε το έντυπο να είναι σκαναρίσιμο
  const qrDataUrl = (url) =>
    loadImageDataUrl(`https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=0&data=${encodeURIComponent(url)}`).
    catch(() => null);

  const drawCover = async (logoImages) => {
    const bands = 240;
    for (let i = 0; i < bands; i += 1) {
      const t = i / (bands - 1);
      const color = GRADIENT[0].map((v, k) => Math.round(v + (GRADIENT[1][k] - v) * t));
      doc.setFillColor(color[0], color[1], color[2]);
      doc.rect(0, (PH / bands) * i, PW, PH / bands + 0.3, 'F');
    }

    const boxW = C.logoBoxW;
    const boxH = C.logoBoxH;
    const boxX = (PW - boxW) / 2;
    const boxY = C.logoBoxY;
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
      let h = C.logoH;
      let w = h / ratio;
      if (w > cellW - C.logoPadX) { w = cellW - C.logoPadX; h = w * ratio; }
      doc.addImage(dataUrl, props.fileType || 'PNG', boxX + cellW * i + (cellW - w) / 2, boxY + (boxH - h) / 2, w, h);
    });
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(boxX + cellW, boxY + 9, boxX + cellW, boxY + boxH - 9);

    const cursor = { v: C.titleY };
    const centered = (text, size, color) => {
      wrapRich(doc, sanitize(text), C.titleMaxW, size).forEach((tokens) => {
        drawRich(doc, tokens, PW / 2, cursor.v, size, color, 'center');
        cursor.v += lineH(size);
      });
    };

    centered(MANUAL_META.title, C.title, [255, 255, 255]);
    cursor.v += C.afterTitle;
    centered(MANUAL_META.subtitle, C.subtitle, [238, 232, 248]);
    cursor.v += C.afterSubtitle;
    centered(MANUAL_META.subtitleLong, C.subtitleLong, [216, 206, 236]);
    cursor.v += C.afterSubtitleLong;
    if (MANUAL_META.coverNote) {
      centered(MANUAL_META.coverNote, C.note, [208, 196, 230]);
      cursor.v += C.afterNote;
    }

    setFont(doc, false, C.edition);
    doc.setTextColor(226, 218, 240);
    const dateLabel = new Date().toLocaleDateString('el-GR', { month: 'long', year: 'numeric' });
    doc.text(`Έκδοση: ${dateLabel}`, PW / 2, cursor.v, { align: 'center' });
    cursor.v += C.afterEdition;

    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.4);
    doc.line(PW / 2 - C.dividerHalf, cursor.v, PW / 2 + C.dividerHalf, cursor.v);
  };

  // Σελίδα-χάρτης «Η βάρδια σου σε 6 βήματα» — αμέσως μετά το εξώφυλλο.
  // Επιστρέφει τα ορθογώνια κάθε βήματος, ώστε να μπουν μετά οι σύνδεσμοι στα κεφάλαια.
  const drawJourney = (iconImages) => {
    const J = P.journey;
    doc.addPage();
    y.v = MT;
    const rects = [];
    let prev = null;

    setFont(doc, true, J.title);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.text(sanitize(SHIFT_JOURNEY.title), ML, y.v);
    y.v += lineH(J.title) + 4;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(ML, y.v, PW - MR, y.v);
    y.v += 6;

    if (J.showSubtitle) {
      paragraph(SHIFT_JOURNEY.subtitle, { size: J.subtitle, color: [122, 114, 142], gap: 5 });
    }

    SHIFT_JOURNEY.steps.forEach((step, i) => {
      const r = J.circle;
      const indent = r * 2 + 4;
      const titleLines = wrapRich(doc, sanitize(`${step.n}. ${step.title}`), CW - indent, J.stepTitle);
      const hintLines = wrapRich(doc, sanitize(step.hint), CW - indent, J.hint);
      const refLines = wrapRich(doc, sanitize(journeyChapterRef(step)), CW - indent, J.ref);
      const extraLines = step.extraRefs?.length
        ? wrapRich(doc, sanitize(step.extraRefs.join(' · ')), CW - indent, J.ref)
        : [];

      const height = titleLines.length * lineH(J.stepTitle)
        + hintLines.length * lineH(J.hint)
        + (refLines.length + extraLines.length) * lineH(J.ref)
        + J.rowGap;
      ensure(height + 1);

      const top = y.v - 1.2;
      const cy = y.v - 1.4;

      // Κάθετη χρονογραμμή: γραμμή σύνδεσης με το προηγούμενο βήμα
      const page = doc.getNumberOfPages();
      if (prev && prev.page === page) {
        doc.setDrawColor(220, 212, 238);
        doc.setLineWidth(0.7);
        doc.line(ML + r, prev.cy + r + 0.8, ML + r, cy - r - 0.8);
      }
      prev = { cy, page };

      doc.setFillColor(91, 33, 182);
      doc.circle(ML + r, cy, r, 'F');

      const iconPng = iconImages[i];
      if (iconPng) {
        const s = r * 1.25;
        doc.addImage(iconPng, 'PNG', ML + r - s / 2, cy - s / 2, s, s);
      } else {
        setFont(doc, true, J.stepTitle * 0.75);
        doc.setTextColor(255, 255, 255);
        doc.text(String(step.n), ML + r, cy + J.stepTitle * 0.1, { align: 'center' });
      }

      titleLines.forEach((tokens) => {
        drawRich(doc, tokens, ML + indent, y.v, J.stepTitle, INK);
        y.v += lineH(J.stepTitle);
      });
      hintLines.forEach((tokens) => {
        drawRich(doc, tokens, ML + indent, y.v, J.hint, BODY);
        y.v += lineH(J.hint);
      });
      refLines.forEach((tokens) => {
        drawRich(doc, tokens, ML + indent, y.v, J.ref, PURPLE);
        y.v += lineH(J.ref);
      });
      extraLines.forEach((tokens) => {
        drawRich(doc, tokens, ML + indent, y.v, J.ref, [122, 114, 142]);
        y.v += lineH(J.ref);
      });

      rects.push({ page: doc.getNumberOfPages(), x: ML, y: top, w: CW, h: height, chapter: step.chapter });
      y.v += J.rowGap;
    });

    return rects;
  };

  // Κλικαμπλ βήματα -> σελίδα κεφαλαίου (οι σελίδες είναι γνωστές μετά τα κεφάλαια και τα Περιεχόμενα)
  const attachJourneyLinks = (rects, entries, extra) => {
    rects.forEach((rect) => {
      const entry = entries[rect.chapter - 1];
      if (!entry) return;
      doc.setPage(rect.page);
      doc.link(rect.x, rect.y, rect.w, rect.h, { pageNumber: entry.page + extra });
    });
  };

  const chapterStart = (number, chapter) => {
    doc.addPage();
    y.v = MT;
    counter.value = 0;

    const badge = P.chapterBadge;
    doc.setFillColor(PURPLE[0], PURPLE[1], PURPLE[2]);
    doc.roundedRect(ML, y.v - 6, badge, badge, 2.4, 2.4, 'F');
    setFont(doc, true, badge * 1.2);
    doc.setTextColor(255, 255, 255);
    doc.text(String(number), ML + badge / 2, y.v + 0.6, { align: 'center' });

    // Ο τίτλος του κεφαλαίου πάντα έντονος (bold)
    wrapRich(doc, `**${sanitize(chapter.title)}**`, CW - badge - 5, S.chapterTitle).forEach((tokens) => {
      drawRich(doc, tokens, ML + badge + 5, y.v, S.chapterTitle, INK);
      y.v += lineH(S.chapterTitle);
    });
    y.v += 4;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(ML, y.v, PW - MR, y.v);
    y.v += 8;

    if (chapter.subtitle) paragraph(chapter.subtitle, { size: S.chapterSubtitle, color: [122, 114, 142], gap: 6 });
  };

  // Ένα block περιεχομένου — κοινό για τα αριθμημένα κεφάλαια και τις πληροφοριακές σελίδες
  const renderBlock = async (block) => {
    if (block.type === 'section') drawSection(block.title);
    else if (block.type === 'step') drawStep(block);
    else if (block.type === 'note') drawNote(block);
    else if (block.type === 'image') await drawImage(block);
    else if (block.type === 'link') await drawLink(block);
    else if (block.type === 'text') (block.lines || []).forEach((line) => paragraph(line));
  };

  const renderBlocks = async (blocks) => {
    for (const block of blocks) await renderBlock(block);
  };

  // Πληροφοριακή σελίδα: υλικό χωρίς αρίθμηση κεφαλαίου και εκτός Περιεχομένων
  const drawInfoChapter = async (chapter) => {
    doc.addPage();
    y.v = MT;
    counter.value = 0;
    drawSection(`Πληροφοριακό: ${chapter.title}`);
    if (chapter.subtitle) paragraph(chapter.subtitle, { size: S.chapterSubtitle, color: [122, 114, 142], gap: 6 });
    await renderBlocks(chapter.blocks);
  };

  // Ενεργός σύνδεσμος στην καταληκτική σελίδα — η διεύθυνση πάντα σε μία γραμμή
  const drawClosingLink = (link) => {
    if (!link) return;
    y.v += 1;
    const linkSize = fitSizeForWidth(doc, link.label, CW, S.link, 9);
    setFont(doc, false, linkSize);
    ensure(lineH(linkSize) + 3);
    const linkW = doc.getTextWidth(link.label);
    doc.setTextColor(PURPLE[0], PURPLE[1], PURPLE[2]);
    doc.text(link.label, ML, y.v);
    doc.setDrawColor(PURPLE[0], PURPLE[1], PURPLE[2]);
    doc.setLineWidth(0.3);
    doc.line(ML, y.v + 1.4, ML + linkW, y.v + 1.4);
    doc.link(ML - 1, y.v - 4.5, linkW + 2, 7.5, { url: link.url });
    y.v += lineH(linkSize) + 4;
  };

  // Καταληκτική σελίδα (χωρίς αρίθμηση κεφαλαίου, εκτός Περιεχομένων): online υλικό & assistant
  const drawClosing = () => {
    doc.addPage();
    y.v = MT;

    drawSection(MANUAL_CLOSING.title);
    (MANUAL_CLOSING.paragraphs || []).forEach((line) => paragraph(line, { size: S.body, gap: 2.4 }));

    // Ενεργός σύνδεσμος προς τον online οδηγό (ίδια τεχνική με τα λογότυπα του εξωφύλλου)
    drawClosingLink(MANUAL_CLOSING.link);

    (MANUAL_CLOSING.notes || []).forEach((block) => drawNote(block));

    // Πρόσθετοι σύνδεσμοι της καταληκτικής σελίδας (π.χ. σύνδεση AI client μέσω MCP)
    (MANUAL_CLOSING.links || []).forEach((link) => drawClosingLink(link));
  };

  const drawToc = (entries, tocStart) => {
    const rowStep = S.tocRow * 0.7056;
    const rowsPerPage = Math.max(1, Math.floor((BOTTOM - MT - 20) / rowStep));
    const chunks = [];
    for (let i = 0; i < entries.length; i += rowsPerPage) chunks.push(entries.slice(i, i + rowsPerPage));

    // Οι σελίδες των κεφαλαίων μετατοπίζονται όταν τα Περιεχόμενα πιάνουν >1 σελίδα
    const extra = chunks.length - 1;
    for (let i = 0; i < extra; i += 1) doc.insertPage(tocStart + 1 + i);

    let globalIndex = 0;
    chunks.forEach((chunk, index) => {
      doc.setPage(tocStart + index);
      y.v = MT;
      setFont(doc, true, S.tocTitle);
      doc.setTextColor(INK[0], INK[1], INK[2]);
      doc.text('Περιεχόμενα', ML, y.v + 2);
      if (chunks.length > 1) {
        setFont(doc, false, S.tocRow * 0.85);
        doc.setTextColor(150, 152, 162);
        doc.text(`${index + 1}/${chunks.length}`, PW - MR, y.v + 2, { align: 'right' });
      }
      y.v += 12;
      doc.setFillColor(147, 51, 234);
      doc.roundedRect(ML, y.v - 5, 22, 1.2, 0.6, 0.6, 'F');
      y.v += 7;

      chunk.forEach((entry) => {
        globalIndex += 1;
        const page = String(entry.page + extra);
        setFont(doc, false, S.tocRow);
        const maxLabelW = CW - 16;
        let label = sanitize(`${globalIndex}. ${entry.title}`);
        if (doc.getTextWidth(label) > maxLabelW) {
          while (label.length > 4 && doc.getTextWidth(`${label}…`) > maxLabelW) label = label.slice(0, -1);
          label += '…';
        }

        doc.setTextColor(BODY[0], BODY[1], BODY[2]);
        doc.text(label, ML, y.v);
        const labelW = doc.getTextWidth(label);
        setFont(doc, true, S.tocRow);
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
        doc.link(ML, y.v - 4, CW, 6, { pageNumber: entry.page + extra });
        y.v += rowStep;
      });
    });

    return extra;
  };

  const drawFooters = (tocStart) => {
    const total = doc.getNumberOfPages();
    for (let p = tocStart; p <= total; p += 1) {
      doc.setPage(p);
      doc.setDrawColor(230, 232, 238);
      doc.setLineWidth(0.3);
      doc.line(ML, PH - MB + 4, PW - MR, PH - MB + 4);
      setFont(doc, false, S.footer);
      doc.setTextColor(150, 152, 162);
      doc.text(sanitize(MANUAL_META.footer), ML, PH - MB + 8.5);
      doc.text(`${p} / ${total}`, PW - MR, PH - MB + 8.5, { align: 'right' });
    }
  };

  const logoImages = await Promise.all(MANUAL_META.logos.map((logo) => loadImageDataUrl(logo.src).catch(() => null)));
  await drawCover(logoImages);

  // Σελίδα-χάρτης «Η βάρδια σου σε 6 βήματα» — μετά το εξώφυλλο, πριν τα Περιεχόμενα
  const journeyIcons = await Promise.all(SHIFT_JOURNEY.steps.map((step) => {
    const Icon = STEP_ICONS[step.icon];
    return Icon ? iconToPng(Icon).catch(() => null) : Promise.resolve(null);
  }));
  const journeyRects = drawJourney(journeyIcons);

  const tocStart = doc.getNumberOfPages() + 1;
  doc.addPage(); // σελίδα Περιεχομένων (συμπληρώνεται στο τέλος)

  const entries = [];
  for (let i = 0; i < MANUAL_CHAPTERS.length; i += 1) {
    onProgress?.(i, MANUAL_CHAPTERS.length);
    const chapter = MANUAL_CHAPTERS[i];
    chapterStart(i + 1, chapter);
    entries.push({ title: chapter.title, page: doc.getNumberOfPages() });

    await renderBlocks(chapter.blocks);
    onProgress?.(i + 1, MANUAL_CHAPTERS.length);
  }

  // Πληροφοριακές σελίδες μετά τα αριθμημένα κεφάλαια (εκτός Περιεχομένων)
  for (const chapter of MANUAL_INFO_CHAPTERS) {
    await drawInfoChapter(chapter);
  }

  drawClosing();

  const extra = drawToc(entries, tocStart);
  attachJourneyLinks(journeyRects, entries, extra);
  drawFooters(tocStart);

  doc.save(P.fileName);
}