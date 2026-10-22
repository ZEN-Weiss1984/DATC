/* Transcribed from the active (uncommented) Table 1 and Table 2 of the
   supplied manuscript, retrieved 2026-10-22. Do not mix RM scores across RMs. */
window.DATC_RESULTS = {
  'qwen-base': {name:'Qwen3-14B · Base', rows:[
    {method:'Initial', values:[-2.54,6.65,8.42,6.76]},
    {method:'SFT', values:[3.75,7.00,3.15,6.53]},
    {method:'GRPO', values:[10.87,37.39,28.49,7.70]},
    {method:'DATC', values:[13.35,49.57,39.31,7.99], std:[0.16,1.12,1.79,0.05]}
  ]},
  'qwen-instruct': {name:'Qwen3-14B · Instruct', rows:[
    {method:'Initial', values:[11.43,63.35,66.75,7.96]},
    {method:'GRPO', values:[13.75,72.80,73.60,8.36]},
    {method:'DATC', values:[14.43,73.66,74.86,8.41], std:[0.09,1.59,1.43,0.09]}
  ]},
  'llama-base': {name:'Llama-3.1-8B · Base', rows:[
    {method:'Initial', values:[-28.06,0.00,0.03,2.01]},
    {method:'SFT', values:[-8.08,4.02,1.24,4.91]},
    {method:'GRPO', values:[4.55,9.73,2.83,5.61]},
    {method:'DATC', values:[11.80,12.58,5.10,5.78], std:[0.39,0.85,0.48,0.06]}
  ]},
  'llama-instruct': {name:'Llama-3.1-8B · Instruct', rows:[
    {method:'Initial', values:[-0.26,11.47,3.02,6.81]},
    {method:'GRPO', values:[19.61,21.61,8.41,7.13]},
    {method:'DATC', values:[24.73,27.08,9.35,7.45], std:[1.04,1.25,0.63,0.05]}
  ]}
};
window.DATC_ABLATIONS = [
  {method:'Initial', values:[-2.54,6.65,8.42,6.76]},
  {method:'SFT', values:[3.75,7.00,3.15,6.53]},
  {method:'GRPO', values:[10.87,37.39,28.49,7.70]},
  {method:'P2T', values:[10.96,36.40,29.68,7.66]},
  {method:'RED', values:[6.14,13.21,22.30,6.93]},
  {method:'DATC (λ = 4)', values:[13.35,49.57,39.31,7.99], ours:true},
  {method:'DATC (λ = 2)', values:[12.89,41.49,34.49,7.77]},
  {method:'DATC (λ = 8)', values:[12.91,45.96,37.63,7.98]},
  {method:'w/o direction alignment', values:[-4.02,1.53,1.23,2.71]},
  {method:'w/ shuffled weights', values:[10.73,32.62,26.99,7.51]}
];
