<template>
    <nav class="navbar">
        <ul id="navbar-list">
            <li id="logo">
                <h3>SwiftShop</h3>
                <img src="/logo.png"/>
            </li>
            <li id="search-bar"><input type="text" placeholder="Enter the product you are looking for..."/></li>
            <li id="profile-pic"></li>
            <li id="favourites-icon"><font-awesome-icon :icon="['fas', 'heart']" /></li>
            <li id="shopping-cart-icon"><font-awesome-icon :icon="['fas', 'shopping-bag']" /></li>
        </ul>
    </nav>
</template>

<style scoped>

.navbar{
    background-color: white;
    color: inherit;
    display: flex;
    justify-content:space-between;
    flex-direction: row;
    vertical-align: middle;
    align-items: center;
    height: 100px;
}

.navbar img{
    width: 60px;
    height: 60px;
    align-self: center;
}

.navbar ul{
    display: flex;
    align-items: center;
    vertical-align: middle;
    width: 100%;
    justify-content: space-around;
    padding-right: 40px;

}

.navbar li{
    padding-left: 10px;
    padding-right: 10px;
    list-style: none;
}

.navbar li svg{
    width: 25px;
    height: 25px;
    transition: color 0.2s;
}
#favourites-icon{
    color: rgb(255, 105, 105);
}
#favourites-icon::before{
    content: "Wishlist";
    position: absolute;
    margin-top: 30px;
    margin-left: -12px;
    color: black;
    align-self: center;
    vertical-align: middle;
    opacity: 0;
    transition: opacity 0.2s ease-in-out; /* Add a transition to the opacity property */
}

#favourites-icon:hover::before {
  opacity: 1; /* Set opacity to 1 on hover */
}

#shopping-cart-icon::before{
    content: "Shopping Cart";
    position: absolute;
    margin-top: 30px;
    margin-left: -35px;
    color: black;
    align-self: center;
    vertical-align: middle;
    opacity: 0;
    transition: opacity 0.2s ease-in-out; /* Add a transition to the opacity property */
}
#shopping-cart-icon:hover::before {
  opacity: 1; /* Set opacity to 1 on hover */
}

.navbar li svg:hover{
    color: rgb(39, 126, 240);
    cursor: pointer;
}

.navbar a{
    text-decoration: none;
    color: black;
}

.navbar input{
    width: 100%;
    align-self: center;
    vertical-align: middle;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 30px;
    border-style: solid;
    padding-left: 20px;
    padding-left: 20px; 
}

.navbar #search-bar{
    width: 50%;
}

.navbar #logo{  
    display: flex;
    flex-direction: row;
    align-content:center;
}

.navbar #logo h3{
    color:rgb(39, 126, 240) ;
    display: inline;
    height: 20px;
    padding-top: 20px;

}

</style>