import React, {useState} from 'react'
import '../overal/overal.css'
const Overal = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    if (user?.result?.name && user?.result.userStatus=='admin') {
    return (
        <div id='overal'>
            <h1>Hi It's Our Dashboard</h1>
        </div>
    )
} else {
    window.location.replace("/");
}
}

export default Overal
