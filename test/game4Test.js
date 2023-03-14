const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const account1 = ethers.provider.getSigner(0);
    const account2 = ethers.provider.getSigner(1);

    return { game, account1,account2 };
  }
  it('should be a winner', async function () {
    const { game, account1,account2} = await loadFixture(deployContractAndSetVariables);
    const address1 = await account1.getAddress();
    const address2 = await account2.getAddress();
    // nested mappings are rough :}
    await game.connect(account1).write(address2);
    await game.connect(account2).win(address1);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
