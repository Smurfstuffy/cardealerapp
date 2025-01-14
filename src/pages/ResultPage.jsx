import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardModel from '../components/CarModelCard';

const ResultPage = () => {
  const { makeId, year } = useParams();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
        );
        setModels(response.data.Results || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch models');
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [makeId, year]);

  return (
    <div className="flex flex-col h-screen justify-center items-center space-y-4 px-4 md:my-8">
      {loading && <p>Loading models...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && models.length === 0 && (
        <p className="text-center">
          No models found for Make ID {makeId} in {year}.
        </p>
      )}

      {!loading && !error && models.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          {models.map((model) => (
            <CardModel key={model.Model_ID} modelName={model.Model_Name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultPage;
