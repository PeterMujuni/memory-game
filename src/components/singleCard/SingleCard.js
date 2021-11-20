import './SingleCard.css'

export const SingleCard = ({card, handleChoice, flipped, disabled }) => {
    
    const handleClick = () => {
        if(!disabled) {
            handleChoice(card)
        }        
    }
    
    return (        
        <div className="card"> 
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="front card" />
                <img 
                    className="back" 
                    src="/img/cover.png" 
                    onClick={handleClick} 
                    alt="back card" />
            </div>
        </div>
        
    )
}
