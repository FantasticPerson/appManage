/**
 * Created by wdd on 2017/2/14.
 */
export function generateTreeViewData(data){
    let depts = data.depts;
    let emps = data.emps;
    if(depts && emps){
        let deptsArr = [];
        for(let i = 0;i<depts.length;i++){
            let deptArr = [];
            for(let j=0;j<emps.length;j++){
                if(emps[j].deptId == depts[i].did &&　emps[j].userId.length > 0){
                    deptArr.push(emps[j])
                }
            }
            deptsArr.push({dep:depts[i],emps:deptArr});
        }
        return deptsArr;
    }
    return [];
}