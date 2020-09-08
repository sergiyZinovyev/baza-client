export interface IConfigVisitorStorage{
    subject: 'visitors' | 'visitorsEdit' | 'visitorsCreate',
    //pass: string,
    model: object,
}

export const model = [
    'regnum',
    'name',
    'prizv',
    'namepovne',
    'countryid',
    // 'postindeks',
    'regionid',
    'city',
    // 'address',
    // 'postaddreses',
    // 'telephon',
    'pobatkovi',
    'gender',
    'm_robotu',
    'sferadij',
    'posada',
    // 'type',
    'kompeten',
    'potvid',
    'email',
    //'datawnesenny ',
    'datelastcor',
    // 'rating',
    'ins_user',
    'cellphone',
    // 'userid',
    'realname',
    // 'reg_countryid',
    // 'reg_regionid',
    //'country',
    //'reg2_countryid',
    //'reg2_regionid',
    //'region',
    // 'cityid',
    // 'id_visitor',
    // 'visited_exhib',
    'sending',
    'password'
]

// export class model {
//     regnum: boolean = true;
//     name: boolean = true;
//     prizv: boolean = true;
//     namepovne: boolean = true;
//     // 'countryid',
//     // 'postindeks',
//     regionid: boolean = true;
//     city: boolean = true;
//     // 'address',
//     // 'postaddreses',
//     // 'telephon',
//     pobatkovi: boolean = true;
//     gender: boolean = true;
//     // 'm_robotu',
//     // 'sferadij',
//     // 'posada',
//     // 'type',
//     kompeten: boolean = true;
//     // 'potvid',
//     email: boolean = true;
//     //'datawnesenny ',
//     // 'datelastcor',
//     // 'rating',
//     // 'ins_user',
//     cellphone: boolean = true;
//     // 'userid',
//     // 'realname',
//     // 'reg_countryid',
//     // 'reg_regionid',
//     //'country',
//     //'reg2_countryid',
//     //'reg2_regionid',
//     //'region',
//     // 'cityid',
//     // 'id_visitor',
//     // 'visited_exhib',
//     sending: boolean = true;
//     password: boolean = true;

//     constructor(){}

//     static prop(): string[] {
//         //console.log(Object.getOwnPropertyNames(this));
//         return Object.getOwnPropertyNames(this)
//     }
    
// }

export class Visitor { 
    constructor(visitorData){
        for (let key in visitorData){
            if(model.includes(key)) {    
                switch (key) {
                    case 'sending':
                        this[key] = visitorData[key] === 0 ? false : true;
                        break;
                    case 'password':
                        this[key] = visitorData[key] !== '' ? true : false;
                        break;
                    case 'regnum':
                        this[key] = visitorData[key];
                        break;
                    default:
                        this[key] = String(visitorData[key]);;
                        break;
                } 
            }
        }
    }
}
