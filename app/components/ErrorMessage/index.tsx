const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="text-orange-400">
      {error !== "Next_Redirect" && (
        <div className="text-orange-300">{error}</div>
      )}
    </div>
  );
};

export default ErrorMessage;
