test('This probe should not fail', ()=>{
    const message1 = 'hello'
    const message2 = message1.trim()
    
    expect(message1).toBe(message2)
})