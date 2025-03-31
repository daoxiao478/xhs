// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function xc_sign(a1 = "", x_s = "", x_t = "") {
    const b1 = "I38rHdgsjopgIvesdVwgIC+oIELmBZ5e3VwXLgFTIxS3bqwErFeexd0ekncAzMFYnqthIhJed9MDKutRI3KsYorWHPtGrbV0P9WfIi/eWc6eYqtyQApPI37ekmR6QL+5Ii6sdneeSfqYHqwl2qt5B0DBIx++GDi/sVtkIxdsxuwr4qtiIhuaIE3e3LV0I3VTIC7e0utl2ADmsLveDSKsSPw5IEvsiVtJOqw8BuwfPpdeTFWOIx4TIiu6ZPwrPut5IvlaLbgs3qtxIxes1VwHIkumIkIyejgsY/WTge7eSqte/D7sDcpipedeYrDNIC6eDVw2IENsSqtlnlSuNjVtIx5e1qt3bmAeVn8LIES/IEk+wn4iI3Yq8lEgIkLxoqwkICqV2d3ejIgs1uwRIvge003sfeuPIEAe6SmDyuwuIiKeTf0sxm/e1Vt4LsJeYqwuIv8acAdedqwCpfesSPwgIxQrIvkkoVwGzVw+ag4QPW/edngeTVwoIEosjBAsxLrvIE0s0L3s6fGdIhNs3uwvIEmWtuwpOqwCI3JeTVtFIk3siqwVIEosdqtMHPw2sVwAIvuRIxFz87HW2ZNexutEIhV2Ii5edPw/bl88/U6sYazVIiFB4utHsPw5IvvekqtYtF/eTm3sVFpBIhNsx70siut8nuwwIC0ejqwRIiOeTecBIvOeD95eSut7Ix5s6Vwu2fWBIEcnICgsVM6s6eesSI3eDVtQIvzzIxcEaqwpI3+CIk3s6FD3GUOsjutaIEM2ZutX2zAsYzgeWPwBoPwGIvmDIkiyBVw4GPtbICKe0/oexqwqgPt+IEb8NqtuI3Heb/imIEJedjJeY/5sTutoPVtzIiZcI37s3Vt6IE5ejWPUIxie/pPNIxh4Ix3skqtUoqwOOPwxIxVVIhNsV0deVPwZgSD6ICD4KuwNLuwBI3GDI3+cIkEEIhJe3SOe3Wc3yutrI3bVrutNcPtAIiNs6/ulIhhY/oJeSVtvbVtVomqmo7ZlIhcTeuwyIkgsiZQBIkSyBPwSIhZwGPwf/uwyIil7IxhdI3Ly/utDIkMzIh3s1qwWsZ4EIvIqICJs0oos3qwfIxr9IkG0pYZTICmFgZuUIxgedI3sSutJIiJeTuwwIkQNI3geYqtmIxSKnVw3Ivds3lPtaPteOPtnIvvefVtoIEdedlVRIkvsWL3sTPtoOadsDuwnsYKeiVwoIvdeTL3s3uwaIimRIEL4/qt+Qrm8I3/eSuweZaoeDzmVrPtLI3bNIE0eWDFaIv5ejutNIvDPIhOeWb8CIhEyIEl4+YqJI3KsdFERIkiIIv89Iv0eW0QKPqtNzPt++ZKeSpNsfqtiICJsSWKs1VwteqtZIxzynqthcVwLJuwxwutiyuwT29Ne1lJeinosil5sTVwHIhS/IkLIICLSIE/sVj5sxdhvOuwBIiWtoPtawaAeVVt8I3KeYp5sSfIyIx7eSPtPGZDVI3NsfVtxIv6sVVtX+qwcIv7sYs8BJVwdmAJs0pZFIkosdPttZuwEa95sxVwkeVtPputeIvZKIkERoDdsfl6s1qtTIx3eVuwJbPtLK/7ekpEWcdSPNMGVbuwLautrIx8AIvTmIxmuJl5skscGIxIZI3ucrPwoI34YJVwHIkgeTIu0LuwNIETn";
    const common = {
        s0: 3,
        s1: "",
        x0: "1",
        x1: "3.3.0",
        x2: "Mac OS",
        x3: "xhs-pc-web",
        x4: "4.60.2",
        x5: a1,
        x6: x_t,
        x7: x_s,
        x8: b1,
        x9: mrc(x_t + x_s + b1),
        x10: 54,
    };
    const encodeStr = encodeUtf8(JSON.stringify(common));
    const x_s_common = b64Encode(encodeStr);
    const x_b3_traceid = get_b3_trace_id();
    return {
        "X-s": x_s,
        "X-T": x_t,
        "X-S-Common": x_s_common,
        "x-b3-traceid": x_b3_traceid,
        'x-mns': 'unload'
    };
  }
  
  export function get_b3_trace_id() {
    const chars = "abcdef0123456789";
    let result = "";
    for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  function mrc(e) {
    const ie = [
        0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685,
        2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995,
        2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648,
        2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990,
        1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755,
        2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145,
        1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
        2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980,
        1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
        3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527,
        1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772,
        4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290,
        251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719,
        3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
        453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202,
        4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960,
        984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733,
        3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467,
        855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048,
        3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
        702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
        3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945,
        2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430,
        2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580,
        2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225,
        1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143,
        2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732,
        1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
        2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135,
        1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109,
        3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
        1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920,
        3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877,
        83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603,
        3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
        534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934,
        4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795,
        376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105,
        3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
        936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108,
        3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449,
        601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
        3272380065, 1510334235, 755167117,
    ];
    let o = -1;
  
    function rightWithoutSign(num, bit = 0) {
        return (num >>> bit);
    }
  
    for (let n = 0; n < 57; n++) {
        o = ie[(o & 255) ^ e.charCodeAt(n)] ^ rightWithoutSign(o, 8);
    }
    return o ^ -1 ^ 3988292384;
  }
  
  const lookup = [
    "Z", "m", "s", "e", "r", "b", "B", "o", "H", "Q", "t", "N", "P", "+", "w", "O",
    "c", "z", "a", "/", "L", "p", "n", "g", "G", "8", "y", "J", "q", "4", "2", "K",
    "W", "Y", "j", "0", "D", "S", "f", "d", "i", "k", "x", "3", "V", "T", "1", "6",
    "I", "l", "U", "A", "F", "M", "9", "7", "h", "E", "C", "v", "u", "R", "X", "5"
  ];
  
  function tripletToBase64(e) {
    return lookup[(63 & (e >> 18))] +
        lookup[(63 & (e >> 12))] +
        lookup[((e >> 6) & 63)] +
        lookup[(e & 63)];
  }
  
  function encodeChunk(e, t, r) {
    let m = [];
    for (let b = t; b < r; b += 3) {
        const n = ((16711680 & (e[b] << 16)) +
            ((e[b + 1] << 8) & 65280) +
            (e[b + 2] & 255));
        m.push(tripletToBase64(n));
    }
    return m.join('');
  }
  
  function b64Encode(e) {
    const P = e.length;
    const W = P % 3;
    let U = [];
    const z = 16383;
    let H = 0;
    const Z = P - W;
    while (H < Z) {
        U.push(encodeChunk(e, H, H + z > Z ? Z : H + z));
        H += z;
    }
    if (W === 1) {
        const F = e[P - 1];
        U.push(lookup[F >> 2] + lookup[(F << 4) & 63] + "==");
    } else if (W === 2) {
        const F = (e[P - 2] << 8) + e[P - 1];
        U.push(lookup[F >> 10] + lookup[(F >> 4) & 63] + lookup[(F << 2) & 63] + "=");
    }
    return U.join('');
  }
  
  function encodeUtf8(e) {
    let b = [];
    const m = encodeURIComponent(e);
    for (let i = 0; i < m.length; i++) {
        if (m[i] === "%") {
            const hex = m.substr(i + 1, 2);
            b.push(parseInt(hex, 16));
            i += 2;
        } else {
            b.push(m.charCodeAt(i));
        }
    }
    return b;
  }
  
  function base36encode(number, alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    if (typeof number !== 'number' || number % 1 !== 0) {
        throw new TypeError('number must be an integer');
    }
  
    let base36 = '';
    let sign = '';
  
    if (number < 0) {
        sign = '-';
        number = -number;
    }
  
    if (0 <= number && number < alphabet.length) {
        return sign + alphabet[number];
    }
  
    while (number !== 0) {
        const i = number % alphabet.length;
        number = Math.floor(number / alphabet.length);
        base36 = alphabet[i] + base36;
    }
  
    return sign + base36;
  }
  
  function base36decode(number) {
    return parseInt(number, 36);
  }
  
  export function get_search_id() {
    const e = BigInt(Date.now()) << 64n;
    const t = BigInt(Math.floor(Math.random() * 2147483646));
    return base36encode(Number(e + t));
  }