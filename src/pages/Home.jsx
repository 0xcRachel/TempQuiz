import React, { useState } from 'react';
import Hero from '../components/home/Hero';
import UploadDropzone from '../components/upload/UploadDropzone';
import FilePreviewCard from '../components/upload/FilePreviewCard';
import SchemaGuideModal from '../components/upload/SchemaGuideModal';
import { DEFAULT_QUIZ } from '../data/defaultQuiz';

export default function Home({
  onStartQuiz,
  onShowToast,
  isSchemaOpen,
  onCloseSchema
}) {
  const [stagedQuiz, setStagedQuiz] = useState(null);
  const [stagedFileName, setStagedFileName] = useState('');

  const handleQuizParsed = (quizData, fileName) => {
    setStagedQuiz(quizData);
    setStagedFileName(fileName);
    onShowToast(`Đã nhận: "${quizData.title}" (${quizData.totalQuestions} câu)`, 'success');
  };

  const handleLoadDefault = () => {
    setStagedQuiz(DEFAULT_QUIZ);
    setStagedFileName('sample-highperf-quiz.json');
    onShowToast('Đã nạp bộ đề mẫu.', 'info');
  };

  const handleError = (errorMsg) => {
    onShowToast(errorMsg, 'error');
  };

  const handleStartStaged = () => {
    if (stagedQuiz) {
      onStartQuiz(stagedQuiz);
    }
  };

  const handleClearStaged = () => {
    setStagedQuiz(null);
    setStagedFileName('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <Hero />

      <section className="mt-4">
        {stagedQuiz ? (
          <FilePreviewCard
            quizData={stagedQuiz}
            fileName={stagedFileName}
            onStart={handleStartStaged}
            onClear={handleClearStaged}
          />
        ) : (
          <UploadDropzone
            onQuizReady={handleQuizParsed}
            onLoadDefault={handleLoadDefault}
            onError={handleError}
          />
        )}
      </section>

      <SchemaGuideModal
        isOpen={isSchemaOpen}
        onClose={onCloseSchema}
      />
    </div>
  );
}
