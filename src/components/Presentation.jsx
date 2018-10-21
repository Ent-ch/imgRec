const Presentation = props => {
  return <div className="container">
    <div className="g--6 g-s--12 fade-in-from-top card anim-delay--5">
      <div className="">
        I fade in from the top
      </div>
    </div>
    <div className="g--6 g-s--12 fade-in-from-top anim-delay--10 card nudge--left nudge--right no-nudge--s">
      <div className="">
      I fade in from the right
    </div>
    </div>
  </div>
}

export default Presentation;
