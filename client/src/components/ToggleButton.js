const RenderAgain = ({ setIsRender, isRender }) => {
  return (
    <div>
      <button onClick={() => setIsRender(true) && console.log(isRender)}>
        RENDER
      </button>
    </div>
  );
};

export default RenderAgain;
