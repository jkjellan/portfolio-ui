varying vec2 vertexUV;

void main() {
    vertexUV = uv;
    // x, y, z, and w (transform)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}