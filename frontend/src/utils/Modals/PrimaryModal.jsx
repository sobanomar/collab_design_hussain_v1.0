import PrimaryButton from "../Buttons/PrimaryButton";

const PrimaryModal = ({ onClose, heading, buttonText, children, onSubmit }) => {
  const handleOutsideClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation(); // Stop event from bubbling up
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
      onClick={handleOutsideClick}
    >
      <div
        onClick={handleModalContentClick}
        className="bg-white dark:bg-dark-900 rounded-3xl max-w-[80%] min-w-[30%] py-6 px-8 shadow-lg max-h-[90vh] overflow-y-scroll scrollbar-hidden"
      >
        <h2 className="text-4xl mt-8 font-bold text-center text-primary">
          {heading}
        </h2>
        <div className="space-y-6 mt-16">{children}</div>
        <div className="mt-6 w-full ">
          <PrimaryButton
            className={"w-full mt-16 justify-center"}
            text={buttonText}
            action={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default PrimaryModal;
