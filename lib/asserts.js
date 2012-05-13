/**
 * Throw error.
 *
 * @param {String} err Error message.
 */
function throwError(err) {
    throw new Error(err);
}

/**
 * Assert id existence in arch.
 * 
 * @param {String} id id to validate.
 * @param {Arch} arch Arch to use.
 * @param {String|undefined} err User error message.
 */
var hasId = exports.hasId = function(id, arch, err) {
    if (!arch.hasNode(id)) throwError(err? err : 'There is no such id in arch.nodes: ' + id + '.');
}

/**
 * Assert id existence in arch parents and children.
 * 
 * @param {String} id id to validate.
 * @param {Arch} arch Arch to use.
 * @param {String|undefined} err User error message.
 */
var twoLinksInArch = exports.twoLinksInArch = function(id, arch, err) {
    if (!arch.parents[id]) throwError(err? err : 'There is no such id in arch.parents: ' + id + '.');
    if (!arch.children[id]) throwError(err? err : 'There is no such id in arch.children: ' + id + '.');
}

/**
 * Assert id existence in plan parents and children.
 * 
 * @param {String} id id to validate.
 * @param {Plan} plan Plan to use.
 * @param {String|undefined} err User error message.
 */
var twoLinksInPlan = exports.twoLinksInPlan = function(id, plan, err) {
    if (!plan.parents[id]) throwError(err? err : 'There is no such id in plan(' + plan.getId() + ').parents: ' + id + '.');
    if (!plan.children[id]) throwError(err? err : 'There is no such id in plan(' + plan.getId() + ').children: ' + id + '.');
}

/**
 * Assert id existence in parents and children.
 * 
 * @param {String} id id to validate.
 * @param {Arch|undefined} arch Arch to use.
 * @param {Plan|undefined} plan Plan to use.
 * @param {String|undefined} err User error message.
 */
var twoLinks = exports.twoLinks = function(id, arch, plan, err) {
    if (arch) twoLinksInArch(id, arch, err);
    if (plan) twoLinksInPlan(id, plan, err);
};

/**
 * Assert id1 or id2 existence in plan parents and children.
 * 
 * @param {String} id1 id to validate.
 * @param {String} id2 id to validate.
 * @param {Plan} plan Plan to use.
 * @param {String|undefined} err User error message.
 */
var oneOfTwoInPlan = exports.oneOfTwoInPlan = function(id1, id2, plan, err) {
    if ((!plan.parents[id1] || !plan.children[id1]) && (!plan.parents[id2] || !plan.children[id2])) {
        throwError(err? err : 'Both ids are absent in plan(' + plan.getId() + '): ' + id1 + ' and ' + id2 + '.');
    }
}

/**
 * Assert ids existence in arch.
 *
 * @param {String[]} ids ids to validate.
 * @param {Arch|undefined} arch Arch to use.
 * @param {String|undefined} err User error message.
 */
exports.hasIds = function(ids, arch, err) {
    if (arch) ids.forEach(function(id) { hasId(id, arch, err) });
};

/**
 * Assert id type. It should be 'string'.
 *
 * @param {String} id id to validate.
 * @param {String|undefined} err User error message.
 */
exports.idTypeString = function(id, err) {
    if (!(typeof id === 'string')) throwError(err? err : 'Type of id(' + id + ') is not string, but ' + (typeof id) + '.');
};

/**
 * Assert 'id <-> ids' loop. In other words, it is wrong for node 'A' to be a parent / childrent of node 'A'.
 *
 * @param {String} id id to validate.
 * @param {String[]|undefined} parents Parents container to use.
 * @param {String[]|undefined} children Children container to use.
 * @param {String|undefined} err User error message.
 */
exports.noIdLoop = function(id, parents, children, err) {
    if (parents && parents.indexOf(id) !== -1) throwError(err? err : 'Loop found, id is in parents: ' + id + '.');
    if (children && children.indexOf(id) !== -1) throwError(err? err : 'Loop found, id is in children: ' + id + '.');
};

/**
 * Assert 'ids <-> ids' loop. In other words, same node in parents and children is wrong.
 *
 * @param {String[]|undefined} parents Parents container to use.
 * @param {String[]|undefined} children Children container to use.
 * @param {String|undefined} err User error message.
 */
exports.noCrossLoop = function(parents, children, err) {
    if (parents && children) {
        parents.forEach(function(id) {
            if (children.indexOf(id) !== -1) throwError(err? err : 'Parents and children has same id in: ' + id + '.');
        });
    }
};