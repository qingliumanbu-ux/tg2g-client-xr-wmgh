//动态属性对象
export interface Obj {
  [key: string]: any;
}

//转JSON对象
export function toJSON(str: string) {
  let json: any;
  try {
    json = JSON.parse(str);
  } catch (e) {
    json = {};
  };
  return json;
}

export function createFormInfo(obj1: Object, obj2: Object) {
  let formInfo: Object = {};
  return formInfo;
}

export function shift_Color(shift: string) {
  let color: Array<Object> = []
  let shift_list = ['A', 'B', 'C', 'D']
  let color_list = [
    [{ offset: 0, color: '#F2DD15' }, { offset: 1, color: '#CDBD2A' }],
    [{ offset: 0, color: '#009EFF' }, { offset: 1, color: '#0F69FE' }],
    [{ offset: 0, color: '#01E3FE' }, { offset: 1, color: '#10A7FE' }],
    [{ offset: 0, color: '#0DD9C0' }, { offset: 1, color: '#00D883' }]];
  for (let i_shift in shift_list) {
    if (shift === shift_list[i_shift]) {
      color = color_list[i_shift]
    }
  }

  return color
}

export function shift_name_Color(type: string, shift: string) {
  let color: string = ''
  if (type === 'F') {
    color = '#fff'
  }
  else {
    if (shift === 'A')
      color = '#2ebaff';
    if (shift === 'B')
      color = '#2ebaff';
    if (shift === 'C')
      color = '#2ebaff';
    if (shift === 'D')
      color = '#2ebaff';
  }


  return color
}

export function shift_Cname_l(shift_ename: Array<string>) {
  let shift_cname: Array<string> = [];
  for (let i_shift in shift_ename) {
    let i_shift_cname = ''
    if (shift_ename[i_shift] === 'A')
      i_shift_cname = '甲';
    else if (shift_ename[i_shift] === 'B')
      i_shift_cname = '乙';
    else if (shift_ename[i_shift] === 'C')
      i_shift_cname = '丙';
    else if (shift_ename[i_shift] === 'D')
      i_shift_cname = '丁';
    else if (shift_ename[i_shift] === 'ID')
      continue;
    else
      i_shift_cname = shift_ename[i_shift]

    shift_cname.push(i_shift_cname)
  }
  return shift_cname
}

export function shift_Cname(shift_ename: string) {
  let shift_cname: string = '';


  if (shift_ename === 'A')
    shift_cname = '甲';
  else if (shift_ename === 'B')
    shift_cname = '乙';
  else if (shift_ename === 'C')
    shift_cname = '丙';
  else if (shift_ename === 'D')
    shift_cname = '丁';
  else
    shift_cname = shift_ename;

  return shift_cname
}
interface ProgressColor {
  startColor: string;
  endColor: string;
}
export function progress_color(Rank: number): ProgressColor {
  let color = { startColor: '#02c2fe', endColor: '#0f3352' };


  if (Rank === 1)
    color = { startColor: '#02c2fe', endColor: '#0f3352' };
  else if (Rank === 2)
    color = { startColor: '#fedc33', endColor: '#524d1f' };
  else if (Rank === 3)
    color = { startColor: '#2bf7fe', endColor: '#1c4452' };
  else if (Rank === 4)
    color = { startColor: '#18f290', endColor: '#12463b' };
  else
    color = { startColor: '#6e8efb', endColor: '#a777e3' };

  return color
}

export function progress_hex_color(Rank: number) {
  let color = '#30b2fb';


  if (Rank === 1)
    color = '#30b2fb';
  else if (Rank === 2)
    color = '#fbe660';
  else if (Rank === 3)
    color = '#59e2fb';
  else if (Rank === 4)
    color = '#40efb6';
  else
    color = '#6e8efb';
  return color
}

export function hexToRgb(hex: string): string {
  // 去除 # 号
  hex = hex.replace("#", "");
  // 如果是缩写形式的颜色值（如 #FFF），则进行转换
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  // 将 16 进制颜色值转换为 RGB 格式
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b},0.3)`;
}

