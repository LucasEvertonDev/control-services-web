export class DateHelper {
    // to send api string use new Date().toISOString()
    public static formatDate(x: Date, y: string, jsDate: boolean = true): string {
        var z: any = {
            M: x.getMonth() + (jsDate ? 0 : 1),
            d: x.getDate(),
            h: x.getHours(),
            m: x.getMinutes(),
            s: x.getSeconds()
        };
    
        y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v: string) {
            return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
        });
    
        return y.replace(/(y+)/g, function(v) {
            return x.getFullYear().toString().slice(-v.length)
        });
    }

    public static parseToDate(date: string | undefined): Date {

        if (!date || date.length < 10){
            return new Date();
        }
    
        let z = {
            d: date.substring(0, 2),
            M: date.substring(3, 5),
            A: date.substring(6, 10),
            h: date.length < 12 ? '0' : date.substring(10, 12),
            m: date.length < 15 ? '0' : date.substring(13, 15),
            s: date.length < 18 ? '0' : date.substring(16, 18)
        };
        var data = new Date(parseInt(z.A), parseInt(z.M), parseInt(z.d), parseInt(z.h), parseInt(z.m)); 
        console.log(data);
        return data;
    }

    public static GetDateNow(format: string): Date {
        var date = new Date();
        return this.getDate(this.formatDate(date, format));
    }


    private static getDate(date: string | undefined): Date{
        console.log(date);
        if(!date){
            return new Date();
        }
    
        let z = {
            A: date.substring(0, 4),
            M: date.substring(5, 7),
            d: date.substring(8, 10),
            h: date.length < 13 ? '0' : date.substring(11, 13),
            m: date.length < 16 ? '0' : date.substring(14, 16),
        };
        var data = new Date(parseInt(z.A), parseInt(z.M), parseInt(z.d), parseInt(z.h), parseInt(z.m) ); 
        return data;
    }
}
