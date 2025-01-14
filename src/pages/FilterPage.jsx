import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Selector from '../components/Selector';
import Button from '../components/Button';
import axios from 'axios';

const FilterPage = () => {
  const [selectedMakeId, setSelectedMakeId] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [carMakes, setCarMakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_GET_MAKES_FOR_VEHICHETYPE;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarMakes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        setCarMakes(
          response.data.Results.map((make) => ({
            label: make.MakeName,
            value: make.MakeId,
          })),
        );
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch car makes');
      } finally {
        setLoading(false);
      }
    };

    fetchCarMakes();
  }, []);

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year, value: year };
  });

  const handleNext = () => {
    if (selectedMakeId && selectedYear) {
      navigate(`/result/${selectedMakeId}/${selectedYear}`);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center space-y-4">
      <h1 className="font-bold text-3xl md:text-5xl">Choose your car</h1>

      {loading && <p>Loading car makes...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="flex flex-row py-1 space-x-2 md:space-x-4">
          <Selector
            placeholder="Select Car Make"
            options={carMakes}
            value={selectedMakeId}
            onChange={(e) => setSelectedMakeId(e.target.value)}
          />
          <Selector
            placeholder="Select Model Year"
            options={years}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />
        </div>
      )}
      <Button
        label="Next"
        onClick={handleNext}
        disabled={!selectedMakeId || !selectedYear || loading}
      />
    </div>
  );
};

export default FilterPage;
