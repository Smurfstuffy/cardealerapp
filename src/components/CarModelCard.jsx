const CardModel = ({ modelName }) => {
  return (
    <div className="bg-gray-200 rounded-md border border-gray-300 p-4 shadow-sm">
      <h1 className="text-gray-600 text-xl md:text-3xl text-center">
        {modelName}
      </h1>
    </div>
  );
};

export default CardModel;
