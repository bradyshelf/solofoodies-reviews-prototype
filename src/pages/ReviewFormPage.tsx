
import { useState } from 'react';
import { ArrowLeft, Star, Send, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ReviewFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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
    
    // Show success dialog instead of immediate navigation
    setShowSuccessDialog(true);
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
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
        <div className="max-w-4xl lg:max-w-screen-xl mx-auto flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-left">
            <h1 className="text-xl font-semibold text-gray-900">Escribir Reseña</h1>
            <p className="text-sm text-gray-500">Califica tu experiencia de colaboración</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl lg:max-w-screen-xl mx-auto px-4 md:px-8 lg:px-32 py-6 space-y-6">
        {/* Project Info */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-left">Detalles de la Colaboración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <div>
              <h3 className="font-medium text-gray-900">Colaboración con {pendingReview.reviewerName}</h3>
              <p className="text-sm text-gray-600">con {pendingReview.collaboratorName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Requerimientos:</p>
              <p className="text-sm text-gray-900">{pendingReview.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Rating Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-left">Calificación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-left">
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
            <CardTitle className="text-lg font-semibold text-left">Comentarios (Opcional)</CardTitle>
          </CardHeader>
          <CardContent className="text-left">
            <Textarea
              placeholder="Comparte tu experiencia sobre esta colaboración..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-32 resize-none text-left"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            disabled={rating === 0}
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar Reseña
          </Button>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              ¡Reseña Enviada!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Tu reseña ha sido enviada exitosamente. Gracias por compartir tu experiencia.
            </p>
            <Button 
              onClick={handleSuccessDialogClose}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Volver a Reseñas
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewFormPage;
