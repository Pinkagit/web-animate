#include <emscripten.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE
void getBezierPoints(float t, float* points, int numCurves, float* results) {
    for (int i = 0; i < numCurves; ++i) {
        float* p0 = &points[i * 6];
        float* p1 = &points[i * 6 + 2];
        float* p2 = &points[i * 6 + 4];

        results[i * 2] = (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0];
        results[i * 2 + 1] = (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1];
    }
}

}
