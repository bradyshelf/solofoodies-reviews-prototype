
import { useState } from 'react';
import { ArrowLeft, Star, Send, CheckCircle } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const ReviewFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [didPost, setDidPost] = useState('');
  
  // Restaurant review ratings (5 separate questions)
  const [restaurantRatings, setRestaurantRatings] = useState({
    contentQuality: 0,
    socialImpact: 0,
    conceptCommunication: 0,
    punctualityProfessionalism: 0,
    creatorSatisfaction: 0
  });
  const [hoveredRestaurantRating, setHoveredRestaurantRating] = useState('');

  // Determine if this is a foodie review based on navigation state
  const isFoodieReview = location.state?.reviewType === 'foodie';

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

  // Calculate average rating for restaurant reviews
  const calculateAverageRating = () => {
    const ratings = Object.values(restaurantRatings);
    const nonZeroRatings = ratings.filter(rating => rating > 0);
    if (nonZeroRatings.length === 0) return 0;
    return Math.round(nonZeroRatings.reduce((sum, rating) => sum + rating, 0) / nonZeroRatings.length);
  };

  const handleSubmitReview = () => {
    // Only check for post question if it's a foodie review
    if (isFoodieReview && !didPost) {
      alert('Por favor indica si realizaste la publicación');
      return;
    }
    
    // For restaurant reviews, check if at least one rating is provided
    if (!isFoodieReview) {
      const hasRating = Object.values(restaurantRatings).some(rating => rating > 0);
      if (!hasRating) {
        alert('Por favor proporciona al menos una calificación');
        return;
      }
    } else {
      // For foodie reviews, check the single rating
      if (rating === 0) {
        alert('Por favor selecciona una calificación');
        return;
      }
    }
    
    // Only require comments when it's a foodie review and they didn't post
    if (isFoodieReview && didPost === 'no' && !feedback.trim()) {
      alert('Los comentarios son requeridos cuando no se realizó la publicación');
      return;
    }
    
    // Here you would typically submit to your API
    const finalRating = isFoodieReview ? rating : calculateAverageRating();
    console.log('Submitting review:', {
      rating: finalRating,
      restaurantRatings: !isFoodieReview ? restaurantRatings : undefined,
      feedback,
      didPost,
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

  const renderRestaurantStars = (questionKey: string, currentRating: number, interactive = false) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer transition-colors ${
              star <= (interactive ? (hoveredRestaurantRating === questionKey ? currentRating : restaurantRatings[questionKey as keyof typeof restaurantRatings]) : currentRating)
                ? 'fill-[#FFC107] text-[#FFC107]'
                : 'text-gray-300 hover:text-[#FFC107]'
            }`}
            onClick={() => interactive && setRestaurantRatings(prev => ({...prev, [questionKey]: star}))}
            onMouseEnter={() => interactive && setHoveredRestaurantRating(questionKey)}
            onMouseLeave={() => interactive && setHoveredRestaurantRating('')}
          />
        ))}
      </div>
    );
  };

  const restaurantQuestions = [
    { key: 'contentQuality', text: '¿Qué te pareció la calidad del contenido publicado?' },
    { key: 'socialImpact', text: '¿Cómo calificarías el impacto de la colaboración en redes sociales?' },
    { key: 'conceptCommunication', text: '¿Qué tan bien comunicó la esencia o concepto?' },
    { key: 'punctualityProfessionalism', text: '¿Fue puntual y profesional durante la visita?' },
    { key: 'creatorSatisfaction', text: '¿Qué tan satisfecho estás con el creador?' }
  ];

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

        {/* Post Question Section - Only for Foodie Reviews */}
        {isFoodieReview && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-left">Publicación</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-sm text-gray-600 mb-4">
                ¿Realizaste la publicación acordada?
              </p>
              <RadioGroup value={didPost} onValueChange={setDidPost} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {/* Rating Section */}
        {isFoodieReview ? (
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
        ) : (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-left">Calificación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {restaurantQuestions.map((question, index) => (
                <div key={question.key} className="text-left">
                  <p className="text-sm text-gray-600 mb-3">
                    {index + 1}. {question.text}
                  </p>
                  {renderRestaurantStars(question.key, restaurantRatings[question.key as keyof typeof restaurantRatings], true)}
                  {restaurantRatings[question.key as keyof typeof restaurantRatings] > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {restaurantRatings[question.key as keyof typeof restaurantRatings]} de 5 estrellas
                    </p>
                  )}
                </div>
              ))}
              {calculateAverageRating() > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    Calificación promedio: {calculateAverageRating()} de 5 estrellas
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Feedback Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-left">
              Comentarios {(isFoodieReview && didPost === 'no') ? '(Requerido)' : '(Opcional)'}
            </CardTitle>
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
            disabled={isFoodieReview ? rating === 0 : !Object.values(restaurantRatings).some(rating => rating > 0)}
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
