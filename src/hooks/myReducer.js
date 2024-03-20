import { useState } from "react"

export default function(reducer, data) {
    const [state, setState] = useState(data);

    return [state, (action) => {
        setState(reducer(state, action));
    }]
}