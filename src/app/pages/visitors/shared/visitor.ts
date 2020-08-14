export class Visitor { 
    // regnum:number;
    // name:string;
    // pobatkovi:string;
    // prizv:string;
    // gender:string;
    // cellphone:string;
    // email:string;
    // countryid:string;
    // regionid:string;
    // city:string;
    // m_robotu:string;
    // posada:string;
    // sferadij:string;
    // potvid: string;

    // namepovne: string;
    // postindeks: string;
    // address:string;
    // postaddreses: string;
    // telephon: string;
    // type: string;
    // kompeten: string;
    // datawnesenny: string;
    // datelastcor: string;
    // rating: string;
    // ins_user: string;
    // sending: boolean;

    // password: boolean;

    constructor(visitorData?){
        if(visitorData?.regnum) this['regnum'] = visitorData?.regnum;
        if(visitorData?.name) this['name'] = visitorData?.name;
        if(visitorData?.pobatkovi) this['pobatkovi'] = visitorData?.pobatkovi;
        if(visitorData?.prizv) this['prizv'] = visitorData?.prizv;
        if(visitorData?.gender) this['gender'] = visitorData?.gender;
        if(visitorData?.cellphone) this['cellphone'] = visitorData?.cellphone;
        if(visitorData?.email) this['email'] = visitorData?.email;
        if(visitorData?.countryid) this['countryid'] = visitorData?.countryid;
        if(visitorData?.regionid) this['regionid'] = visitorData?.regionid;
        if(visitorData?.city) this['city'] = visitorData?.city;
        if(visitorData?.m_robotu) this['m_robotu'] = visitorData?.m_robotu;
        if(visitorData?.sferadij) this['sferadij'] = visitorData?.sferadij;
        if(visitorData?.potvid) this['potvid'] = visitorData?.potvid;
        if(visitorData?.namepovne) this['namepovne'] = visitorData?.namepovne;
        if(visitorData?.postindeks) this['postindeks'] = visitorData?.postindeks;
        if(visitorData?.address) this['address'] = visitorData?.address;
        if(visitorData?.postaddreses) this['postaddreses'] = visitorData?.postaddreses;
        if(visitorData?.telephon) this['telephon'] = visitorData?.telephon;
        if(visitorData?.type) this['type'] = visitorData?.type;
        if(visitorData?.kompeten) this['kompeten'] = visitorData?.kompeten;
        if(visitorData?.datawnesenny) this['datawnesenny'] = visitorData?.datawnesenny;
        if(visitorData?.datelastcor) this['datelastcor'] = visitorData?.datelastcor;
        if(visitorData?.rating) this['rating'] = visitorData?.rating;
        if(visitorData?.ins_user) this['ins_user'] = visitorData?.ins_user;
        //this.regnum = visitorData?.regnum ?? null;
        //this.name = visitorData?.name ?? "";
        //this.pobatkovi = visitorData?.pobatkovi ?? "";
        //this.prizv = visitorData?.prizv ?? "";
        //this.gender = visitorData?.gender ?? "";
        //this.cellphone = visitorData?.cellphone ?? "";
        //this.email = visitorData?.email ?? "";
        //this.countryid = visitorData?.countryid ?? null;
        //this.regionid = visitorData?.regionid ?? null;
        //this.city = visitorData?.city ?? "";
        //this.m_robotu = visitorData?.m_robotu ?? "";
        //this.posada = visitorData?.posada ?? "";
        //this.sferadij = visitorData?.sferadij ?? "";
        //this.potvid = visitorData?.potvid ?? "";

        //this.namepovne = visitorData?.namepovne ?? "";
        //this.postindeks = visitorData?.postindeks ?? "";
        //this.address = visitorData?.address ?? "";
        //this.postaddreses = visitorData?.postaddreses ?? "";
        //this.telephon = visitorData?.telephon ?? "";
        //this.type = visitorData?.type ?? "";
        //this.kompeten = visitorData?.kompeten ?? "";
        //this.datawnesenny = visitorData?.datawnesenny ?? "";
        //this.datelastcor = visitorData?.datelastcor ?? "";
        // this.rating = visitorData?.rating ?? "";
        // this.ins_user = visitorData?.ins_user ?? "";

        // if(visitorData?.sending === 0 || visitorData?.sending === false) this['sending'] = false
        // else this['sending'] = true;

        if(visitorData?.sending === 0 || visitorData?.sending) this['sending'] = visitorData?.sending === 0 ? false : true
        //this.password = visitorData?.password ? true : false;
        if(visitorData?.password || visitorData?.password === '') this['password'] = visitorData?.password !== '' ? true : false;
    }
}
