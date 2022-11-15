const vertexShader = `

uniform sampler2D bumpTexture;
uniform float bumpScale;

varying float vAmount;

void main(){
    vec4 bumpData = texture2D(bumpTexture, uv);

    vAmount = bumpData.r;

    vec3 newPosition = position + normal * bumpScale * vAmount;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}

`

export default vertexShader;