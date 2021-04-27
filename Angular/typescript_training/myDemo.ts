console.log("Hello world");
let myName: string = "mani";
console.log("coding gurus" + " time for some fun..! " + myName);
console.log("coding gurus" + " time for some fun..! " + `${myName}`);

for(let i = 0; i< 5; i++)
{
    console.log(`here we go ${i}`);
}

let nums: number[] = [1,2,3,4];
for(let i=0;i<nums.length;i++){
    console.log("element "+i+"-"+nums[i]);
}

for(let num of nums){
    console.log("different for loop: "+num);
}


//arrays are growable in typescript
let sports: string[] = ["football", "tennis"];
sports.push("cricket");
sports.push("golf");

for(let sport of sports){
    console.log("growable array: "+ sport);
}

