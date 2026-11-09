import React from "react";
import { Link } from "react-router-dom";

const IMG = "https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/";

export function Shot({ src, alt, caption, max = "max-w-md" }) {
  return (
    <figure className="flex flex-col items-center gap-2">
      <img src={IMG + src} alt={alt} className={`w-full ${max} h-auto rounded-2xl border border-gray-200 shadow-sm`} loading="lazy" />
      {caption && <figcaption className="text-sm text-gray-500 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>{caption}</figcaption>}
    </figure>
  );
}

export const S = ({ to, children }) => <Link to={to} className="text-purple-700 underline">{children}</Link>;

export function Intro({ children }) {
  return (
    <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{children}</p>
  );
}
