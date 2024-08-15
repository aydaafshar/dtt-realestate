<template>
    <div class="page">

        <h3>About DTT Real Estate</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, omnis optio id necessitatibus eum fuga saepe
            molestiae quasi doloremque deleniti veritatis incidunt commodi quod mollitia maxime iste facilis provident
            blanditiis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora repellendus obcaecati earum dolor.
            Voluptatem
            cum sequi maiores, ex repudiandae laudantium cumque fugiat totam eius. Et facilis quia corrupti dolorem
            possimus.</p>

        <h3>Design and Development</h3>
        <div class="footer">
            <img src="../assets/logo.png" />
            <div class="links">
                <span>By DTT</span>
                <a href="http://www.d-tt.nl">www.d-tt.nl</a>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.page {
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.page .footer {
    display: flex;
    flex-direction: row;
    gap: 15px;
}

.page .footer img {
    width: 120px;
    object-fit: contain;
}

.page .footer .links {
    display: flex;
    flex-direction: column;
}

.page .footer .links a {
    text-decoration: none;
    color: var(--text-hyperlink);
}
</style>
