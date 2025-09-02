import './Heading.css'

function Heading() {
  return (
    <div>
      <header>
        {/* Repeat circles here */}
        <div className="circle-row">
          {[...Array(3000)].map((_, i) => (
            <div className="circle" key={i}></div>
          ))}
        </div>
        <div className="stack-container">
          <h1 className="that">That</h1> 
          <h1 className="store">90's</h1> 
          <h1 className="that">Store</h1>
          <div className="shape-row">
            <div className="rhombus1"></div>
            <div className="rhombus2"></div>
            <div className="rectangle1"></div>
          </div>
        </div> 
      </header>
    </div>
  )
}
export default Heading