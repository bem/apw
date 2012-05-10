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
var hasIdInArch = exports.hasIdInArch = function(id, plan, err) {
    if (!arch.hasNode(id)) throwError(err? err : 'There is no such id in arch.nodes: ' + id + '.');
    if (!arch.parents[id]) throwError(err? err : 'There is no such id in arch.parents: ' + id + '.');
    if (!arch.children[id]) throwError(err? err : 'There is no such id in arch.children: ' + id + '.');
}

/**
 * Assert id existence in plan.
 * 
 * @param {String} id id to validate.
 * @param {Plan} plan Plan to use.
 * @param {String|undefined} err User error message.
 */
var hasIdInPlan = exports.hasIdInPlan = function(id, plan, err) {
    if (!plan.parents[id]) throwError(err? err : 'There is no such id in plan(' + plan.getId() + ').parents: ' + id + '.');
    if (!plan.children[id]) throwError(err? err : 'There is no such id in plan(' + plan.getId() + ').children: ' + id + '.');
}

/**
 * Assert id existence.
 * 
 * @param {String} id id to validate.
 * @param {Plan|undefined} arch Arch to use.
 * @param {Plan|undefined} plan Plan to use.
 * @param {String|undefined} err User error message.
 */
var hasId = exports.hasId = function(id, arch, plan, err) {
    if (arch) hasIdInArch(id, arch, err);
    if (plan) hasIdInPlan(id, plan, err);
};

/**
 * Assert ids existence.
 *
 * @param {String[]} ids ids to validate.
 * @param {Plan|undefined} arch Arch to use.
 * @param {Plan|undefined} plan Plan to use.
 * @param {String|undefined} err User error message.
 */
exports.hasIds = function(ids, arch, plan, err) {
    if (arch) ids.forEach(function(id) { hasIdInArch(id, arch, err) });
    if (plan) ids.forEach(function(id) { hasIdInPlan(id, plan, err) });
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