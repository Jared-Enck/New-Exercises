
function choice(items) {
    const idx = Math.floor(Math.random() * items.length)
    return items[idx]
}

function remove(items,item) {
    const found = items.indexOf(item)
    return (found !== -1) ? items.splice(found,1) : undefined
}

export {choice,remove}