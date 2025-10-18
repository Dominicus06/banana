'use client';

import { useState } from 'react';
import CareerQuiz from '../components/CareerQuiz';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <CareerQuiz />
    </main>
  );
}
