
import { useState } from 'react';
import { ArrowLeft, Star, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ReviewFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  // Mock data - in real app this would come from API based on id
  const pendingReview = {
    id: id,
    projectTitle: "Colaboración Menú Navideño - Café Delicias",
    reviewerName: "Café Delicias",
    collaboratorName: "María García",
    date: "2024-01-20",
    description: "Campaña promocional para el menú especial de temporada navideña"
  };

  const handleBack = () => {
    navigate('/reviews');
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert('Por favor selecciona una calificación');
      return;
    }
    
    // Here you would typically submit to your API
    console.log('Submitting review:', {
      rating,
      feedback,
      reviewId: id
    });
    
    // Navigate back to reviews page after submission
    navigate('/reviews');
  };

  const renderStars = (interactive = false) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-8 h-8 cursor-pointer transition-colors ${
              star <= (interactive ? (hoveredRating || rating) : rating)
                ? 'fill-[#FFC107] text-[#FFC107]'
                : 'text-gray-300 hover:text-[#FFC107]'
            }`}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Escribir Reseña</h1>
            <p className="text-sm text-gray-500">Califica tu experiencia de colaboración</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Project Info */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Detalles de la Colaboración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-900">{pendingReview.projectTitle}</h3>
              <p className="text-sm text-gray-600">con {pendingReview.collaboratorName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de colaboración:</p>
              <p className="text-sm text-gray-900">
                {new Date(pendingReview.date).toLocaleDateString('es-ES')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Descripción:</p>
              <p className="text-sm text-gray-900">{pendingReview.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Rating Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Calificación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                ¿Cómo calificarías esta colaboración?
              </p>
              {renderStars(true)}
              {rating > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  {rating} de 5 estrellas
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Comentarios (Opcional)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Comparte tu experiencia sobre esta colaboración..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-32 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-2">
              {feedback.length}/500 caracteres
            </p>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            onClick={handleSubmitReview}
            className="w-full bg-[#E94E77] hover:bg-[#E94E77]/90 text-white py-3"
            disabled={rating === 0}
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar Reseña
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormPage;
