function flames(str1,str2){
	let cmap1 = buildMap(str1);
	let cmap2 = buildMap(str2);
	let flamesCount = getUniqueLetterCount(cmap1,cmap2);
	let flames =  strike('flames',flamesCount);
	return flames;
}

function diff(a,b){
	return Math.abs(a-b)
}

function buildMap(str){
    str = str.replace(/ /g,'').toLowerCase();
    let res = {}
    for(let i=0;i<str.length;i++)
        res[str[i]] = res[str[i]] + 1 || 1;
    return res;
}

function getUniqueLetterCount(map1,map2){
    let count = 0;
    for(char in map1){
        if(map2[char]){
            count += diff(map1[char],map2[char]);
            delete map2[char];
        }
        else {
            count += map1[char]
        }
    }
    for(char in map2) {
        count += map2[char]	
    }
    return count;
}

function strike(flames, count, init = 0){
	let res;
	let newCount;
	let actualCount = count;
    if(init == flames.length) init = 0;
    if(init) count = count - (flames.length - init);
    if(count % flames.length == 0) { newCount = flames.length-1; }
    else { newCount = (count % flames.length) - 1 }
    flames = flames.replace(flames[newCount],'');
    if(flames.length == 1) { 
      res=flames; 
      return res; 
    } else {
      return strike(flames ,actualCount, newCount)
    }
}

module.exports = (str1, str2) => flames(str1, str2)