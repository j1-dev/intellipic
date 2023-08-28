import React from 'react';

const FaqMain = () => {
  const faqData = [
    {
      question: '¿Qué tipo de fotos debo subir a la plataforma? 📸',
      answer:
        'Recomendamos que subas una variedad de fotos para asegurar que tu avatar sea lo más preciso posible. Esto puede incluir tomas de primer plano de tu rostro, fotos de tu perfil y fotos de cuerpo completo. Es importante asegurarse de que tus fotos sean claras y de alta calidad, y que no incluyan a otras personas ni animales. También te recomendamos incluir una variedad de expresiones, ubicaciones, fondos y perspectivas en tus fotos para crear el avatar más preciso posible.'
    },
    {
      question: '¿Cómo de parecido será el avatar a mi apariencia? 👩‍🎨',
      answer:
        'La precisión de tu avatar dependerá en gran medida de la cantidad y variedad de las fotos que proporciones. Cuanto mejores y más diversas sean las fotos, más fácil será para la IA entender y replicar tus características faciales y corporales. Como resultado, ¡tu avatar tendrá más probabilidad de parecerse a tu apariencia real!'
    },
    {
      question: '¿Es posible obtener un reembolso? 💰',
      answer:
        'Es posible obtener un reembolso por compras realizadas en los primeros 14 días, siempre y cuando aún no hayas entrenado a la IA. Sin embargo, una vez que haya pasado el período de 14 días o si ya has utilizado el servicio (haciendo clic en el botón de entrenamiento), ya no serás elegible para un reembolso.'
    },
    {
      question: '¿Qué sucederá con mis fotos? 🖼',
      answer:
        'Puedes eliminar todas las fotos y conjuntos de datos asociados al modelo al eliminar el modelo de tu cuenta.\n\nPara solicitar que se elimine tu cuenta y todos los datos asociados, envía un correo electrónico a intellipic1@gmail.com. Ten en cuenta que al eliminar tu cuenta, ya no tendrás acceso a ningún dato o contenido asociado a ella.'
    }
  ];

  return (
    <div className="max-w-screen-lg mt-5">
      <ul>
        {faqData.map((item, index) => (
          <li key={index}>
            <h3 className="text-xl font-bold">{item.question}</h3>
            <p className="mb-4">{item.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FaqMain;
