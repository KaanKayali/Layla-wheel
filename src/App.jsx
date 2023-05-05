import "./styles.css"

export default function App(){

  return (
    <>
      <h1>layla - Spinwheel</h1>
      <div>

        


      </div>
      {/*Wheel*/}
      <div class="container">
        <div class="spinBtn">Spin</div>
        <div class="wheel">
          <div class="wheelinput" style="--i:0;"><span>100</span></div>
          <div class="wheelinput" style="--i:1;"><span>1</span></div>
          <div class="wheelinput" style="--i:2;"><span>50</span></div>
          <div class="wheelinput" style="--i:3;"><span>20</span></div>
          <div class="wheelinput" style="--i:4;"><span>0</span></div>
        </div>
        
      </div>
    </>
  )
}