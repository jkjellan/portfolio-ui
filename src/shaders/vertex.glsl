varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    // x, y, z, and w (transform)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}