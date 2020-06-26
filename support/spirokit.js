'use strict';
var r1_SetupBuilders, _r1_t0, _r1_t1, _r1_t2, _r1_t3, _r1_t4, _r1_t5, _r1_t6, _r1_t7, _r1_t8, _r1_t9, _r1_t10, _r1_t11, _r1_t12;
var r1_SpiroJs = require('spiro');
var r1_SpiroExpansionContext = require('./spiroexpand');
var r1_ShapeOps = require('caryll-shapeops');
var r1_CurveUtil = require('./curve-util');
var r1_Transform = require('./transform');
var r1_fallback = function _r1_t8() {
    var _r129_t3;
    var _r129_t1 = arguments;
    var r129_j = 0;
    var _r129_t2 = r129_j < _r129_t1.length;
    for (; _r129_t2; _r129_t2 = r129_j < _r129_t1.length) {
        if (_r129_t1[r129_j] !== void 0)
            return _r129_t1[r129_j];
        _r129_t3 = r129_j = r129_j + 1;
    }
    return _r129_t3;
};
var r1_mix = function _r1_t9(r130_a, r130_b, r130_p) {
    return r130_a + (r130_b - r130_a) * r130_p;
};
var r1_bez2 = function _r1_t10(r131_a, r131_b, r131_c, r131_t) {
    return (1 - r131_t) * (1 - r131_t) * r131_a + 2 * (1 - r131_t) * r131_t * r131_b + r131_t * r131_t * r131_c;
};
var r1_bez3 = function _r1_t11(r132_a, r132_b, r132_c, r132_d, r132_t) {
    return (1 - r132_t) * (1 - r132_t) * (1 - r132_t) * r132_a + 3 * (1 - r132_t) * (1 - r132_t) * r132_t * r132_b + 3 * r132_t * r132_t * (1 - r132_t) * r132_c + r132_t * r132_t * r132_t * r132_d;
};
exports.SetupBuilders = r1_SetupBuilders = function _r1_t12(r134_args) {
    var _r134_t0 = r134_args;
    var r134_para = _r134_t0.para;
    var r134_Glyph = _r134_t0.Glyph;
    var r134_Contrast = _r134_t0.Contrast;
    var r134_globalTransform = _r134_t0.globalTransform;
    var r134_Stroke = _r134_t0.Stroke;
    var r134_Superness = _r134_t0.Superness;
    var r134_g4 = function _r134_t8(r135_x, r135_y, r135_f) {
        return {
            'x': r135_x,
            'y': r135_y,
            'type': 'g4',
            'af': r135_f
        };
    };
    var r134_g2 = function _r134_t9(r136_x, r136_y, r136_f) {
        return {
            'x': r136_x,
            'y': r136_y,
            'type': 'g2',
            'af': r136_f
        };
    };
    var r134_corner = function _r134_t10(r137_x, r137_y, r137_f) {
        return {
            'x': r137_x,
            'y': r137_y,
            'type': 'corner',
            'af': r137_f
        };
    };
    var r134_flat = function _r134_t11(r138_x, r138_y, r138_f) {
        return {
            'x': r138_x,
            'y': r138_y,
            'type': 'left',
            'af': r138_f
        };
    };
    var r134_curl = function _r134_t12(r139_x, r139_y, r139_f) {
        return {
            'x': r139_x,
            'y': r139_y,
            'type': 'right',
            'af': r139_f
        };
    };
    var r134_close = function _r134_t13(r140_f) {
        return {
            'type': 'close',
            'af': r140_f
        };
    };
    var r134_end = function _r134_t14(r141_f) {
        return {
            'type': 'end',
            'af': r141_f
        };
    };
    var r134_straight = {
        'l': r134_flat,
        'r': r134_curl
    };
    var _r134_t15 = [
        {
            'name': 'up',
            'x': 0,
            'y': 1
        },
        {
            'name': 'down',
            'x': 0,
            'y': -1
        },
        {
            'name': 'left',
            'x': -1,
            'y': 0
        },
        {
            'name': 'right',
            'x': 1,
            'y': 0
        }
    ];
    var _r134_t16 = [
        {
            'name': 'start',
            'l': 0,
            'r': 0.01
        },
        {
            'name': 'mid',
            'l': -0.005,
            'r': 0.005
        },
        {
            'name': 'end',
            'l': -0.01,
            'r': 0
        }
    ];
    var _r134_t17 = [
        r134_g4,
        r134_g2,
        r134_corner,
        r134_straight
    ];
    (function (_r134_leti1, _r134_leti2, _r134_leti3) {
        var r142_direction, _r142_t5, _r142_t6;
        var r142_directions = _r134_leti1;
        var r142_adhensions = _r134_leti2;
        var r142_knottypes = _r134_leti3;
        var _r142_t0 = r142_directions;
        var _r142_t1 = _r142_t0.length;
        var _r142_t2 = 0;
        var _r142_t4 = _r142_t2 < _r142_t1;
        for (; _r142_t4; _r142_t4 = _r142_t2 < _r142_t1) {
            r142_direction = _r142_t0[_r142_t2];
            _r142_t6 = r142_direction;
            (function (_r142_leti3) {
                var r145_knottype, _r145_t5, _r145_t6;
                var r145_d = _r142_leti3;
                var _r145_t0 = r142_knottypes;
                var _r145_t1 = _r145_t0.length;
                var _r145_t2 = 0;
                var _r145_t4 = _r145_t2 < _r145_t1;
                for (; _r145_t4; _r145_t4 = _r145_t2 < _r145_t1) {
                    r145_knottype = _r145_t0[_r145_t2];
                    _r145_t6 = r145_knottype;
                    (function (_r145_leti3) {
                        var r148_adh, _r148_t5, _r148_t6;
                        var r148_kt = _r145_leti3;
                        r148_kt[r145_d.name] = {};
                        var _r148_t0 = r142_adhensions;
                        var _r148_t1 = _r148_t0.length;
                        var _r148_t2 = 0;
                        var _r148_t4 = _r148_t2 < _r148_t1;
                        for (; _r148_t4; _r148_t4 = _r148_t2 < _r148_t1) {
                            r148_adh = _r148_t0[_r148_t2];
                            _r148_t6 = r148_adh;
                            (function (_r148_leti3) {
                                var r151_a = _r148_leti3;
                                return r148_kt[r145_d.name][r151_a.name] = function _r151_t0(r152_x, r152_y, r152_f) {
                                    return [
                                        r1_fallback(r148_kt.l, r148_kt)(r152_x + r145_d.x * r151_a.l, r152_y + r145_d.y * r151_a.l, r152_f),
                                        r1_fallback(r148_kt.r, r148_kt)(r152_x + r145_d.x * r151_a.r, r152_y + r145_d.y * r151_a.r, r152_f)
                                    ];
                                };
                            }(_r148_t6));
                            _r148_t5 = _r148_t2 = _r148_t2 + 1;
                        }
                        return _r148_t5;
                    }(_r145_t6));
                    _r145_t5 = _r145_t2 = _r145_t2 + 1;
                }
                return _r145_t5;
            }(_r142_t6));
            _r142_t5 = _r142_t2 = _r142_t2 + 1;
        }
        return _r142_t5;
    }(_r134_t15, _r134_t16, _r134_t17));
    var r134_widths = function _r134_t20(r153_l, r153_r) {
        return function _r153_t2() {
            var _r154_t0 = this;
            return _r154_t0['set-width'](r153_l, r153_r);
        };
    };
    r134_widths.lhs = function _r134_t21(r155_w) {
        return r134_widths(r1_fallback(r155_w, r134_Stroke), 0);
    };
    r134_widths.rhs = function _r134_t22(r156_w) {
        return r134_widths(0, r1_fallback(r156_w, r134_Stroke));
    };
    r134_widths.center = function _r134_t23(r157_w) {
        return r134_widths(r1_fallback(r157_w, r134_Stroke) / 2, r1_fallback(r157_w, r134_Stroke) / 2);
    };
    var r134_xn$disablegizmo$3qIs = function _r134_t24() {
        return function _r158_t2() {
            var _r159_t0 = this;
            return _r159_t0.gizmo = r1_Transform.Id();
        };
    };
    var r134_xn$disablecontrast$3qIs = function _r134_t25() {
        return function _r160_t2() {
            var _r161_t0 = this;
            return _r161_t0.contrast = 1;
        };
    };
    var r134_heading = function _r134_t26(r162_d) {
        return function _r162_t2() {
            var _r163_t0 = this;
            return _r163_t0['heads-to'] ? _r163_t0['heads-to'](r162_d) : void 0;
        };
    };
    r134_widths.heading = function _r134_t27(r164_l, r164_r, r164_d) {
        return function _r164_t2() {
            var _r165_t0 = this;
            if (_r165_t0['set-width'])
                _r165_t0['set-width'](r164_l, r164_r);
            return _r165_t0['heads-to'] ? _r165_t0['heads-to'](r164_d) : void 0;
        };
    };
    r134_widths.lhs.heading = function _r134_t28(r166_w, r166_d) {
        return function _r166_t2() {
            var _r167_t0 = this;
            if (_r167_t0['set-width'])
                _r167_t0['set-width'](r1_fallback(r166_w, r134_Stroke), 0);
            return _r167_t0['heads-to'] ? _r167_t0['heads-to'](r166_d) : void 0;
        };
    };
    r134_widths.rhs.heading = function _r134_t29(r168_w, r168_d) {
        return function _r168_t2() {
            var _r169_t0 = this;
            if (_r169_t0['set-width'])
                _r169_t0['set-width'](0, r1_fallback(r168_w, r134_Stroke));
            return _r169_t0['heads-to'] ? _r169_t0['heads-to'](r168_d) : void 0;
        };
    };
    r134_widths.center.heading = function _r134_t30(r170_w, r170_d) {
        return function _r170_t2() {
            var _r171_t0 = this;
            if (_r171_t0['set-width'])
                _r171_t0['set-width'](r1_fallback(r170_w, r134_Stroke) / 2, r1_fallback(r170_w, r134_Stroke) / 2);
            return _r171_t0['heads-to'] ? _r171_t0['heads-to'](r170_d) : void 0;
        };
    };
    var r134_unimportant = function _r134_t31() {
        var _r172_t0 = this;
        if (_r172_t0.points && _r172_t0.points.length && _r172_t0.points[_r172_t0.points.length - 1])
            _r172_t0.points[_r172_t0.points.length - 1].subdivided = true;
        return _r172_t0.controlKnots && _r172_t0.controlKnots.length && _r172_t0.controlKnots[_r172_t0.controlKnots.length - 1] ? _r172_t0.controlKnots[_r172_t0.controlKnots.length - 1].unimportant = true : void 0;
    };
    var r134_important = function _r134_t32() {
        return void 0;
    };
    var r134_afInterpolate = function _r134_t33(r174_before, r174_after, r174_args) {
        return r134_g4(r1_mix(r174_before.x, r174_after.x, r174_args.rx), r1_mix(r174_before.y, r174_after.y, r174_args.ry), r1_fallback(r174_args.raf, r134_unimportant));
    };
    var r134_afInterpolateG2 = function _r134_t34(r175_before, r175_after, r175_args) {
        return r134_g2(r1_mix(r175_before.x, r175_after.x, r175_args.rx), r1_mix(r175_before.y, r175_after.y, r175_args.ry), r1_fallback(r175_args.raf, r134_unimportant));
    };
    var r134_afInterpolateThem = function _r134_t35(r176_before, r176_after, r176_args) {
        var r176_rx, r176_ry, r176_preserve, _r176_t3, _r176_t4;
        var r176_knots = [];
        var _r176_t0 = r176_args.rs;
        var _r176_t1 = _r176_t0.length;
        var _r176_t2 = 0;
        for (; _r176_t2 < _r176_t1; _r176_t2 = _r176_t2 + 1) {
            _r176_t3 = _r176_t0[_r176_t2];
            r176_rx = _r176_t3[0];
            r176_ry = _r176_t3[1];
            r176_preserve = _r176_t3[2];
            r176_knots.push(r1_fallback(r176_args.ty, r134_g2)(r1_mix(r176_before.x, r176_after.x, r176_rx), r1_mix(r176_before.y, r176_after.y, r176_ry), r1_fallback(r176_args.raf, (_r176_t4 = r176_preserve, 1 === _r176_t4 ? r176_before.af : 2 === _r176_t4 ? r176_after.af : r134_unimportant))));
        }
        return r176_knots;
    };
    var r134_alsoThru = function _r134_t36(r178_rx, r178_ry, r178_raf) {
        return {
            'type': 'interpolate',
            'rx': r178_rx,
            'ry': r178_ry,
            'raf': r178_raf,
            'af': r134_afInterpolate
        };
    };
    r134_alsoThru.g2 = function _r134_t37(r179_rx, r179_ry, r179_raf) {
        return {
            'type': 'interpolate',
            'rx': r179_rx,
            'ry': r179_ry,
            'raf': r179_raf,
            'af': r134_afInterpolateG2
        };
    };
    var r134_alsoThruThem = function _r134_t38(r180_rs, r180_raf, r180_ty) {
        return {
            'type': 'interpolate',
            'rs': r180_rs,
            'raf': r180_raf,
            'ty': r180_ty,
            'af': r134_afInterpolateThem
        };
    };
    var r134_bezcontrols = function _r134_t39(r181_x1, r181_y1, r181_x2, r181_y2, r181__samples, r181_raf, r181_ty) {
        var r181_samples = r1_fallback(r181__samples, 3);
        var r181_rs = [];
        var _r181_t0 = 1;
        var _r181_t1 = r181_samples;
        var r181_j = _r181_t0;
        for (; r181_j < _r181_t1; r181_j = r181_j + 1)
            r181_rs.push([
                r1_bez3(0, r181_x1, r181_x2, 1, r181_j / r181_samples),
                r1_bez3(0, r181_y1, r181_y2, 1, r181_j / r181_samples)
            ]);
        return r134_alsoThruThem(r181_rs, r181_raf, r181_ty);
    };
    var r134_quadcontrols = function _r134_t40(r183_x1, r183_y1, r183_samples, r183_raf, r183_ty) {
        return r134_bezcontrols(r183_x1 * 2 / 3, r183_y1 * 2 / 3, r1_mix(1, r183_x1, 2 / 3), r1_mix(1, r183_y1, 2 / 3), r183_samples, r183_raf, r183_ty);
    };
    r134_bezcontrols.absolute = function _r134_t41(r184_x1, r184_y1, r184_x2, r184_y2, r184__samples, r184_raf, r184_ty) {
        return {
            'type': 'interpolate',
            'af': function _r184_t2(r185_before, r185_after) {
                var r185_samples = r1_fallback(r184__samples, 3);
                var r185_rs = [];
                var _r185_t0 = 1;
                var _r185_t1 = r185_samples;
                var r185_j = _r185_t0;
                for (; r185_j < _r185_t1; r185_j = r185_j + 1)
                    r185_rs.push(r1_fallback(r184_ty, r134_g4)(r1_bez3(r185_before.x, r184_x1, r184_x2, r185_after.x, r185_j / r185_samples), r1_bez3(r185_before.y, r184_y1, r184_y2, r185_after.y, r185_j / r185_samples), r1_fallback(r184_raf, r134_unimportant)));
                return r185_rs;
            }
        };
    };
    var r134_DEFAULT_STEPS = 6;
    var _r134_t42 = [];
    var _r134_t4 = function (_r134_leti5) {
        var r187_cache = _r134_leti5;
        var r187_build = function _r187_t0(r188_samples, r188__superness) {
            var r188_theta, r188_c, r188_s;
            var r188_superness = r1_fallback(r188__superness, r134_Superness);
            var r188_hv = [];
            var r188_vh = [];
            var _r188_t0 = 1;
            var _r188_t1 = r188_samples;
            var r188_j = _r188_t0;
            for (; r188_j < _r188_t1; r188_j = r188_j + 1) {
                r188_theta = r188_j / r188_samples * Math.PI / 2;
                r188_c = Math.pow(Math.cos(r188_theta), 2 / r188_superness);
                r188_s = Math.pow(Math.sin(r188_theta), 2 / r188_superness);
                r188_hv.push([
                    r188_s,
                    1 - r188_c
                ]);
                r188_vh.push([
                    1 - r188_c,
                    r188_s
                ]);
            }
            return {
                'hv': r188_hv,
                'vh': r188_vh
            };
        };
        var r187_hv = function _r187_t1(r191_samples, r191__superness) {
            if (r191__superness)
                return r187_build(r191_samples, r191__superness).hv;
            if (!r187_cache[r191_samples])
                r187_cache[r191_samples] = r187_build(r191_samples, r191__superness);
            return r187_cache[r191_samples].hv;
        };
        var r187_vh = function _r187_t2(r192_samples, r192__superness) {
            if (r192__superness)
                return r187_build(r192_samples, r192__superness).vh;
            if (!r187_cache[r192_samples])
                r187_cache[r192_samples] = r187_build(r192_samples, r192__superness);
            return r187_cache[r192_samples].vh;
        };
        return [
            r187_hv,
            r187_vh
        ];
    }(_r134_t42);
    var r134_jhv = _r134_t4[0];
    var r134_jvh = _r134_t4[1];
    var r134_archv = function _r134_t45(r193_samples, r193_superness) {
        return r134_alsoThruThem(r134_jhv(r1_fallback(r193_samples, r134_DEFAULT_STEPS), r193_superness));
    };
    var r134_arcvh = function _r134_t46(r194_samples, r194_superness) {
        return r134_alsoThruThem(r134_jvh(r1_fallback(r194_samples, r134_DEFAULT_STEPS), r194_superness));
    };
    var r134_complexThru = function _r134_t47() {
        var _r195_t1 = arguments;
        var r195_a = [].slice.call(_r195_t1);
        return {
            'type': 'interpolate',
            'af': function _r195_t2(r196_before, r196_after, r196_args) {
                var r196_knot;
                var _r196_t3 = this;
                var r196_ks = [];
                var _r196_t0 = r195_a;
                var _r196_t1 = _r196_t0.length;
                var _r196_t2 = 0;
                for (; _r196_t2 < _r196_t1; _r196_t2 = _r196_t2 + 1) {
                    r196_knot = _r196_t0[_r196_t2];
                    r196_ks.push(r196_knot.af.call(_r196_t3, r196_before, r196_after, r196_knot));
                }
                return r196_ks;
            }
        };
    };
    var r134_flatten = function _r134_t48(r198_knots) {
        var r198_p;
        var r198_a = [];
        var _r198_t0 = r198_knots;
        var _r198_t1 = _r198_t0.length;
        var _r198_t2 = 0;
        for (; _r198_t2 < _r198_t1; _r198_t2 = _r198_t2 + 1) {
            r198_p = _r198_t0[_r198_t2];
            if (r198_p instanceof Array)
                r198_a = r198_a.concat(r134_flatten(r198_p));
            else
                r198_a.push(r198_p);
        }
        return r198_a;
    };
    var r134_prepareSpiroKnots = function _r134_t49(r200__knots, r200_s) {
        var r200_closed = false;
        var r200_lastafs = [];
        var r200_knots = r200__knots;
        for (; r200_knots[0] && r200_knots[0] instanceof Function; r200_knots = r200_knots.slice(1))
            r200_knots[0].call(r200_s);
        for (; r200_knots[r200_knots.length - 1] && (r200_knots[r200_knots.length - 1].type === 'close' || r200_knots[r200_knots.length - 1].type === 'end'); r200_knots = r200_knots.slice(0, -1)) {
            r200_closed = r200_knots[r200_knots.length - 1].type === 'close';
            r200_lastafs.push(r200_knots[r200_knots.length - 1].af);
        }
        r200_knots = r134_flatten(r200_knots);
        if (r200_closed)
            r200_knots.push(r200_knots[0]);
        var _r200_t0 = 0;
        var _r200_t1 = r200_knots.length;
        var r200_j = _r200_t0;
        for (; r200_j < _r200_t1; r200_j = r200_j + 1)
            if (r200_knots[r200_j] && r200_knots[r200_j].type === 'interpolate')
                r200_knots[r200_j] = r200_knots[r200_j].af.call(r200_s, r200_knots[r200_j - 1], r200_knots[r200_j + 1], r200_knots[r200_j]);
        if (r200_closed)
            r200_knots.pop();
        return {
            'knots': r134_flatten(r200_knots),
            'closed': r200_closed,
            'lastafs': r200_lastafs
        };
    };
    var r134_QUAD = false;
    var r134_PRECISION = 0.5;
    var r134_dispiro = function _r134_t50() {
        var _r202_t2 = arguments;
        var _r202_t3 = [].slice.call(_r202_t2, 0);
        return function (_r202_leti0) {
            var r203_args = _r202_leti0;
            return function _r203_t0(r204_dontinc) {
                var r204_knot, r204_af, r204_g, r204_lhsContour, r204_rhsContour, _r204_t12, _r204_t13;
                var _r204_t10 = this;
                var r204_s = new r1_SpiroExpansionContext();
                r204_s.gizmo = _r204_t10.gizmo || r134_globalTransform;
                var _r204_t0 = r134_prepareSpiroKnots([].slice.call(r203_args, 0), r204_s);
                var r204_knots = _r204_t0.knots;
                var r204_closed = _r204_t0.closed;
                var r204_lastafs = _r204_t0.lastafs;
                var _r204_t1 = r204_knots;
                var _r204_t2 = _r204_t1.length;
                var _r204_t3 = 0;
                for (; _r204_t3 < _r204_t2; _r204_t3 = _r204_t3 + 1) {
                    r204_knot = _r204_t1[_r204_t3];
                    _r204_t12 = r204_knot.type;
                    _r204_t13 = r204_knot.af;
                    (function (_r204_leti4, _r204_leti5) {
                        var r206_ty = _r204_leti4;
                        var r206_af = _r204_leti5;
                        return r204_knot.af = function _r206_t0() {
                            var _r207_t0 = this;
                            _r207_t0['set-type'](r206_ty);
                            return r206_af ? r206_af.apply(_r207_t0, r203_args) : void 0;
                        };
                    }(_r204_t12, _r204_t13));
                }
                r1_SpiroJs.spiroToBezierOnContext(r204_knots, r204_closed, r204_s);
                var _r204_t6 = r204_lastafs;
                var _r204_t7 = _r204_t6.length;
                var _r204_t8 = 0;
                for (; _r204_t8 < _r204_t7; _r204_t8 = _r204_t8 + 1) {
                    r204_af = _r204_t6[_r204_t8];
                    if (r204_af)
                        r204_af.call(r204_s);
                }
                var _r204_t9 = r204_s.expand(r1_fallback(r204_s.contrast, r134_Contrast));
                var r204_lhs = _r204_t9.lhs;
                var r204_rhs = _r204_t9.rhs;
                if (r204_closed) {
                    r204_g = new r134_Glyph();
                    r1_SpiroJs.spiroToBezierOnContext(r204_lhs.slice(0, -1), true, r204_g, r134_QUAD, r134_PRECISION);
                    r204_lhsContour = r204_g.contours[0];
                    r204_g.contours = [];
                    r1_SpiroJs.spiroToBezierOnContext(r204_rhs.reverse().slice(0, -1), true, r204_g, r134_QUAD, r134_PRECISION);
                    r204_rhsContour = r204_g.contours[0];
                    r204_g.contours = [r204_lhsContour.concat(r204_rhsContour)];
                } else {
                    r204_g = new r134_Glyph();
                    r204_lhs[0].type = r204_rhs[0].type = r204_lhs[r204_lhs.length - 1].type = r204_rhs[r204_rhs.length - 1].type = 'corner';
                    r1_SpiroJs.spiroToBezierOnContext(r204_lhs.concat(r204_rhs.reverse()), true, r204_g, r134_QUAD, r134_PRECISION);
                }
                r204_g.knots = r204_knots;
                r204_g.lhsKnots = r204_lhs;
                r204_g.rhsKnots = r204_rhs;
                _r204_t10.includeGlyph(r204_g);
                return r204_g;
            };
        }(_r202_t3);
    };
    var r134_xn$spirooutline$1aao = function _r134_t51() {
        var _r209_t2 = arguments;
        var _r209_t3 = [].slice.call(_r209_t2, 0);
        return function (_r209_leti0) {
            var r210_k = _r209_leti0;
            return function _r210_t0(r211_dontinc) {
                var r211_af;
                var _r211_t4 = this;
                var r211_g = new r134_Glyph();
                r211_g.gizmo = _r211_t4.gizmo || r134_globalTransform;
                var _r211_t0 = r134_prepareSpiroKnots(r210_k, r211_g);
                var r211_knots = _r211_t0.knots;
                var r211_closed = _r211_t0.closed;
                var r211_lastafs = _r211_t0.lastafs;
                r1_SpiroJs.spiroToBezierOnContext(r211_knots, r211_closed, r211_g, r134_QUAD, r134_PRECISION);
                var _r211_t1 = r211_lastafs;
                var _r211_t2 = _r211_t1.length;
                var _r211_t3 = 0;
                for (; _r211_t3 < _r211_t2; _r211_t3 = _r211_t3 + 1) {
                    r211_af = _r211_t1[_r211_t3];
                    if (r211_af)
                        r211_af.call(r211_g);
                }
                _r211_t4.includeGlyph(r211_g);
                return r211_g;
            };
        }(_r209_t3);
    };
    var r134_Boole = function _r134_t52(r213_operator) {
        return function _r213_t2() {
            var _r214_t2 = arguments;
            var _r214_t3 = [].slice.call(_r214_t2, 0);
            return function (_r214_leti0) {
                var r215_k = _r214_leti0;
                return function _r215_t0(r216_dontinc) {
                    var r216_item, r216_g1, r216_c1;
                    var _r216_t3 = this;
                    var r216_g = new r134_Glyph();
                    r216_g.gizmo = _r216_t3.gizmo || r134_globalTransform;
                    if (r215_k.length === 0)
                        return r216_g;
                    r216_g.include(r215_k[0]);
                    r216_g.contours = r216_g.contours.map(r1_CurveUtil.convertContourToCubic);
                    var _r216_t0 = r215_k.slice(1);
                    var _r216_t1 = _r216_t0.length;
                    var _r216_t2 = 0;
                    for (; _r216_t2 < _r216_t1; _r216_t2 = _r216_t2 + 1) {
                        r216_item = _r216_t0[_r216_t2];
                        r216_g1 = new r134_Glyph();
                        r216_g1.gizmo = _r216_t3.gizmo || r134_globalTransform;
                        r216_g1.include(r216_item);
                        r216_g1.contours = r216_g1.contours.map(r1_CurveUtil.convertContourToCubic);
                        r216_c1 = r1_ShapeOps.boole(r213_operator, r216_g.contours, r216_g1.contours, r1_ShapeOps.fillRules.nonzero, r1_ShapeOps.fillRules.nonzero, 16384);
                        r216_g.contours = r216_c1.map(function _r216_t5(r219_c) {
                            return r1_CurveUtil.convertContourToCubic(r219_c).reverse();
                        });
                    }
                    _r216_t3.includeGlyph(r216_g);
                    return r216_g;
                };
            }(_r214_t3);
        };
    };
    var r134_union = r134_Boole(r1_ShapeOps.ops.union);
    var r134_intersection = r134_Boole(r1_ShapeOps.ops.intersection);
    var r134_difference = r134_Boole(r1_ShapeOps.ops.difference);
    return {
        'g4': r134_g4,
        'g2': r134_g2,
        'corner': r134_corner,
        'flat': r134_flat,
        'curl': r134_curl,
        'close': r134_close,
        'end': r134_end,
        'straight': r134_straight,
        'widths': r134_widths,
        'disable-gizmo': r134_xn$disablegizmo$3qIs,
        'disable-contrast': r134_xn$disablecontrast$3qIs,
        'heading': r134_heading,
        'unimportant': r134_unimportant,
        'important': r134_important,
        'alsoThru': r134_alsoThru,
        'alsoThruThem': r134_alsoThruThem,
        'bezcontrols': r134_bezcontrols,
        'quadcontrols': r134_quadcontrols,
        'archv': r134_archv,
        'arcvh': r134_arcvh,
        'complexThru': r134_complexThru,
        'dispiro': r134_dispiro,
        'spiro-outline': r134_xn$spirooutline$1aao,
        'union': r134_union,
        'intersection': r134_intersection,
        'difference': r134_difference
    };
};
