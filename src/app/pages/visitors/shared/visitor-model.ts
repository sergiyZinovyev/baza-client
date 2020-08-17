export const model = [
    'regnum',
    'name',
    'prizv',
    'namepovne',
    // 'countryid',
    // 'postindeks',
    'regionid',
    'city',
    // 'address',
    // 'postaddreses',
    // 'telephon',
    'pobatkovi',
    'gender',
    // 'm_robotu',
    // 'sferadij',
    // 'posada',
    // 'type',
     'kompeten',
    // 'potvid',
    // 'email',
    //'datawnesenny ',
    // 'datelastcor',
    // 'rating',
    // 'ins_user',
    'cellphone',
    // 'userid',
    // 'realname',
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
                    default:
                        this[key] = visitorData[key];
                        break;
                } 
            }
        }
    }
}
