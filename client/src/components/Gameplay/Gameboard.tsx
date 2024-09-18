interface GameboardProps {
    mode: "daily" | "custom"
}

export const Gameboard = ({
    mode
}: GameboardProps) => {
    return <div data-testid={`gameboard-${mode}`} id={`gameboard-${mode}`}>
            This is the gameboard
    </div>
}