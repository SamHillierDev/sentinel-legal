import logo from "../assets/images/sentinel-legal.png";

const FormHeader: React.FC = () => {
  return (
    <div className="mb-4 flex justify-center">
      <img src={logo} alt="Sentinel Legal" className="h-16 object-contain" />
    </div>
  );
};

export default FormHeader;
