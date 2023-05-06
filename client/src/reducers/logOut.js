import Dexie from 'dexie';

const logOut = () => {
    localStorage.removeItem('access_token');
    Dexie.delete('MyDatabase');
    window.location.reload();
}

export default logOut()