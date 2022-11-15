const fragmentShader = `

varying float vAmount;

void main(){
    vec3 land = smoothstep(0.01, 0.90, vAmount) * vec3(0.0, 0.0, 1.0);

    gl_FragColor = vec4(land, 1.0);

}

`

export default fragmentShader;