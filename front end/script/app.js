
const generateTable = (class1, courses, cdhrs) => {
    console.log ("start");
    let x = 0;
    for (let n = 0; n<class1.length ; n++){
        var chr = [0,0,0,0,0];
        for (let i=0; i< class1[n].length ; i++)
            for (let j=0; j<class1[n][i].length ; j++){
                
                // Random Number generator 
                x = Math.floor(Math.random() * (5 - 0 +1) + 0 );
                // for the first section, it will fill randomly without checking for any clashes
                if (n === 0){
                    // If the random nmber is greter than zero, within credithours limit
                    // it will assign course to class
                    if (x > 0 && (chr[x-1] < cdhrs[x-1])){
                        class1[n][j][i] = courses[x-1];
                        chr[x-1]++;
                    }
                    // If the credit hours is completed, it assigns 0 to others
                    else
                        class1[n][j][i] = 0;    
                }
                // For more sections, It will check the clashes
                else if (x > 0 && chr[x-1]<cdhrs[x-1]){
                    let ind = n;    // For the sections
                    let c = 0;  // For the count
                    while (ind > -1){
                        // If there is a clash with any of the above sections c will 
                        // save the count of clashes
                        if ((class1[ind][j][i] === courses[x-1] ) && x != 0)
                            c++;
                        ind--;
                    }
                    // If there is no clash, add the course to tha class
                    if (c === 0){
                        class1[n][j][i] = courses[x-1];
                        chr[x-1]++;
                    }
                    // if there is a clash, place 0 and move next
                    else
                        class1[n][j][i] = 0;
                }
    
            }
            for (let cor = 0; cor < courses.length ; cor++){
                while (cdhrs[cor] > chr[cor]){
                    // Iterate through every time slot of everyday
                    for (let day = 0; day < class1[n].length; day++){
                        for (let time=0; time < class1[n][day].length; time ++){
                            // If this if for the first class, check if the slot is zero
                            if (n===0 && class1[n][day][time] == 0 && cdhrs[cor]>chr[cor]){
                                class1[n][day][time] = courses[cor];
                                chr[cor]++;
                            }
                            else {
                                if (class1[n][day][time] == 0 && cdhrs[cor] > chr[cor]){
                                    let ind = n, c = 0;
                                    while (ind > -1){
                                        if (class1[ind][day][time] === courses[cor])
                                            c++;
                                        ind--;
                                    }
                                    if (c === 0){
                                        class1[n][day][time] = courses[cor];
                                        chr[cor]++;
                                    }
                                }
                            }
                            if (cdhrs[cor] === chr[cor])
                                break;
                        }
                        if (cdhrs[cor] === chr[cor])
                            break;
                    }
                }
            }
    }
}

module.exports = generateTable;