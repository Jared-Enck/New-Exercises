import ColorsList from "./ColorsList"

function ColorsContainer({colors}) {
    return (
        <>
            <div>
                <ColorsList colors={colors}/>
            </div>
        </>
    )
}

export default ColorsContainer