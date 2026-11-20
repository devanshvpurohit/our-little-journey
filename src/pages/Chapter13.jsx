import React from 'react';
import ChapterPage from './ChapterPage';

// Fallback for Chapter 13 -> mapped to Chapter 12 (13.jpeg)
export default function Chapter13() {
  return <ChapterPage specificId={12} />;
}
