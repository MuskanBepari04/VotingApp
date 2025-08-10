
const CandidateList = ({ candidateList }) => {

  const apiUrl = import.meta.env.VITE_API_URL;
  
  return (
    <div className="space-y-4">
      {candidateList.map((value, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-green-100 p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-6">
            <div className="hidden sm:block">{index + 1}</div>
            <div className="flex flex-col justify-center items-center sm:flex-row sm:gap-7">
              <div className="font-semibold text-green-800">{value.name}</div>
              <div className="text-green-600 italic">{value.party}</div>
            </div>
          </div>
          <div>
            <img
              src={`${apiUrl}/uploads/${value.image}`}
              alt={value.name}
              className="w-10 h-10 sm:w-16 sm:h-16 object-cover rounded-full border border-green-300"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
