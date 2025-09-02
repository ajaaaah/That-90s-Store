import './Content.css'
import tamagotchiImg from './assets/Tamagotchi.jpg'
import BeaniebabyImg from './assets/beaniebaby1.jpg'
import gameboycolor from './assets/gameboycolor.jpg'

export default function Content() {
  return (
    <div>
        <main>
            <div className="content">
                <div className="items">
                    <img src={tamagotchiImg} alt="Tamagotchi" />
                    <h2>Tamagotchi</h2> 
                    <p>Relive the 90s with this classic Tamagotchi virtual pet. Feed it, play with it, and watch it grow!</p>
                    <p>Price: $19.99</p>
                    <button>Add to Cart</button>
                </div>
                    <div className="items">
                    <img src={BeaniebabyImg} alt="Beanie Baby" />
                    <h2>Beanie Baby</h2> 
                    <p></p>
                    <p>Price: $</p>
                    <button>Add to Cart</button>
                </div>
                    <div className="items">
                    <img src={gameboycolor} alt="Gameboy Color" />
                    <h2>Gameboy Color</h2> 
                    <p></p>
                    <p>Price: $</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        </main>
    </div>
  )
}