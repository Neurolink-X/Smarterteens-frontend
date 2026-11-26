export const roleViews=Object.freeze({
 institute_admin:Object.freeze(["batch","learner","attendance","admission","invoice","receipt"]),
 teacher:Object.freeze(["batch","learner","attendance"]),
 finance:Object.freeze(["batch","learner","invoice","receipt"]),
 student:Object.freeze(["learner","attendance"]),
 guardian:Object.freeze(["learner","attendance"])
});
export const roleLabels=Object.freeze({institute_admin:"Institute administrator",teacher:"Teacher",finance:"Finance staff",student:"Student",guardian:"Parent / guardian"});
export function visibleKinds(role){if(typeof role!=="string"||!Object.hasOwn(roleViews,role))throw new RangeError("Unknown membership role");return roleViews[role];}
export function selectMembership(rows,userId,instituteId){
 if(!Array.isArray(rows))throw new RangeError("Invalid membership result");
 const match=rows.find(m=>m&&m.user_id===userId&&m.institute_id===instituteId&&m.active===true);
 if(!match)return null;
 visibleKinds(match.role);return match;
}
