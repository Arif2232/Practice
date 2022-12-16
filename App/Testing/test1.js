
const numb = [1,2,3,4,5,6,7];
a=0

let text = "";
for (i = 2; i < numb.length; i++) {

    if(numb % i === 0 )
    {
        console.log(`${numb} is not prime number`)

    }
    else 
        {        
console.log(`${numb} is a prime number`)

    }
   
}


// b = 12
// c = b%b
// console.log(c)
